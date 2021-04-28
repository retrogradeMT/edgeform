<template>
  <div>
    <v-autocomplete
      allow-overflow
      :loading="loading"
      v-model="selectBox"
      :items="items"
      :search-input.sync="search"
      :key="opts.itemValue"
      @change="blurField()"
      :outlined="editField == opts.field"
      :label="opts.label"
      class="ma-3"
      :item-text="opts.itemText"
      :item-value="opts.itemValue"
      hide-details
      :deletable-chips="multiple"
      :multiple="multiple"
      small-chips
      :clearable="clearable"
      dense
      @focus="emitFocus"
      type="select"
      autocomplete="new-password"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>Search by typing</v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          :close="multiple"
          small
          label
          @click:close="remove(data.item)"
        >{{ data.item[opts.itemText] }}
        </v-chip
        >
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content class="mb-2">
          <v-list-item-title
            class="text--primary"
            v-text="item[opts.itemText]"
          ></v-list-item-title>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  created() {
    this.debouncedQuery = _.debounce(this.querySelections, 300);
  },
  mounted() {
    this.seed();
  },
  props: {
    active: {
      type: Object,
      required: true
    },
    opts: {
      type: Object,
      required: true
    },
    editField: {
      type: String,
      required: true
    },
    value: {
      type: [ Object, Array, String, Number ],
      required: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      search: null,
      selectBox: [],
      items: []
    };
  },
  computed: {
    selectedItem() {
      return this.active[this.opts.field];
    },

    multiple() {
      return this.opts.multiple;
    }
  },

  methods: {
    emitFocus() {
      this.$emit("fieldFocused", this.opts.field);
    },
    remove(item) {
      let selectBoxFindIndex = this.selectBox.indexOf(item.id);

      if (selectBoxFindIndex >= 0) {
        this.selectBox.splice(selectBoxFindIndex, 1);
        this.blurField();
      }
    },
    blurField() {
      this.$emit("act", this.selectBox, this.opts.field);
      this.$emit("input", this.selectBox);
    },
    seed() {
      let selectBoxClone = _.clone(this.active[this.opts.field]);
      let selectBox = [];
      if (this.opts.multiple) {
        if (selectBoxClone) {
          if (!Array.isArray(selectBoxClone)) {
            if (selectBoxClone !== undefined) {
              if (selectBoxClone.hasOwnProperty("id")) {
                selectBox.push(selectBoxClone.id);
              }
            }
          } else {
            selectBoxClone.forEach(item => {
              selectBox.push(item.id);
            });
          }
        }
      } else {
        if (selectBoxClone) {
          selectBox = selectBoxClone.id;
        }
      }
      this.selectBox = selectBox;
      let opts = this.opts;

      this.items = Object.values(this.$store.state[this.opts.model].all).sort(
        function (a, b) {
          var nameA = a[opts.itemText].toLowerCase(),
            nameB = b[opts.itemText].toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0;
        }
      );
    },

    async querySelections() {
      this.loading = true;
      let includes = this.$store.state[this.opts.model].include;
      let { sortBy, descending } = this.$store.state[
        this.opts.model
        ].pagination;
      let sort = sortBy;
      if (descending) {
        sort = "-" + sortBy;
      }

      let params = {
        "filter_scope[search]": this.search,
        sort: sort,
        include: includes
      };

      let results = await this.$repositories[this.opts.model].index(params);

      this.items = [ ...this.items, ...results.data ];
      this.loading = false;
    }
  },
  watch: {
    search: function (newValue, oldValue) {
      if (newValue && newValue.length > 0) {
        this.debouncedQuery();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>

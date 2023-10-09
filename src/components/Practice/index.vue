<template>
  <div :class="{ 'mb-10': name }">
  <ChooseOption v-if="name === 'Intent or Structure?'" name="Intent or Structure?"/>
  <Select v-if="name === 'Bias Busters'"  name="Bias Busters" placeholder="Explain the bias" />
  <Select v-if="name === 'Parts Of A Prompt'"  name="" placeholder="Add a label" />
  <Placement v-if="name === 'Prompt Puzzles'"  name="" />
  <ChooseOption v-if="name === 'Prompt-Off'"  name="Prompt-Off" orientation="vertical" />
  <Create v-if="name === 'Prompt Crafting'"  name="" />
</div>
</template>

<script>
import ChooseOption from './Choose.vue';
import Select from './Select.vue';
import Placement from './Placement.vue';
import Create from './Create.vue';

export default {
  components: {
    ChooseOption,
    Select,
    Placement,
    Create,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
}
</script>
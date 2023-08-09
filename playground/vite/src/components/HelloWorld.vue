<script 
  setup
  lang="ts"
  style="./styles/index.css"
  template="./index.html"
>
import { ref } from 'vue'

defineOptions({
  name: 'abcd'
})

defineProps<{ msg: string }>()

const count = ref(0)
</script>
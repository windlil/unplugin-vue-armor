# unplugin-vue-armor
🛸Vue macros that provide additional attributes to vue elements.🛸为Vue标签提供更多属性的宏插件

## Installation
```bash
#npm
npm i unplugin-vue-armor -D

#yarn
yarn add unplugin-vue-armor -D

#pnpm
pnpm i unplugin-vue-armor -D
```

## Usage
name:
- If you just need create component name in set up, you can try to use `name` to replace `defineOptions`,only can be used in Vue >= 3.3.

  It will automatically turn this
  ```vue
  <script setup name="VueArmor"></script>
  ```
  into this
  ```vue
  <script setup>
  defineOptions({
    name: "VueArmor"
  })
  </script>
  ```
style:
- Use `style` to import your scoped css, make your code more concise.

  It will automatically turn this
  ```vue
  <script setup style="./styles/index.css"></script>
  ```
  into this
  ```vue
  <script setup></script>

  <style scoped src="./styles/index.css"></style>
  ```
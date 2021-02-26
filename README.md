# hive-clone

## vue cli usage

1. vue@3.*
2. typescript
3. vuex@4.*, vue-router@4.*

[The helper of use vuex with typescript](https://codesandbox.io/s/using-vuex-4-modules-in-vue-3-with-typescript-7ygvy)

## LIB USAGE

1. [axios](https://github.com/axios/axios)
2. [ag-grid-vue](https://www.ag-grid.com/documentation/vue/getting-started/)

===

## css convension

css에 관련되서 알려야할 사항들을 [여기](./CSSNOTICE.md) 에 기록한다.

### #or_*

`organization의 약자` 홈페이지에서 특정하게 하나밖에 없는 layout 정의 ( EX: nav, header, main, footer 등 )

### .s_*

`style의 약자` 특정 element에 단일로 적용하는 공통된 style 정의, 2개 이상의 css context가 올수없다. ( EX: font-size, font-color, gap 등 )

### .a_*

1. `atomic 의 약자` .s_*와는 다르게 2개 이상의 css context가 올수 있으다.
2. 되도록 하위에 공통적으로 적용해야하는 stlye에 대해 기본 태그를 걸지말고 bem 형식의 class를 쓴다.

### .com_*

1. `component 의 약자` .s_*와는 다르게 2개 이상의 css context가 올수 있으다.
2. 되도록 하위에 공통적으로 적용해야하는 stlye에 대해 기본 태그를 걸지말고 bem 형식의 class를 쓴다.

### #v-${router}_*

`view의 약자` 해당 view페이지에서만 특정하게 사용하는 layout 정의

### .sc_*

`script의 약자` 데이터의 반응해 특정하게 보여줘야하는 style의 정의

### 그외 css 공통사항

1. camelCase가 아닌 snake-case를 사용한다
2. `.a_*, .s_*` 등의 `홈페이지 공용 class`는 되도록 태그 선택자를 사용하지 않는다 `EX) .a_ex a:hover { ... } [X]`
3. `홈페이지 공용이 아닌 특정 페이지 종속 class`는 필요에 따라 태그 선택자를 사용하되 되도록 bem naming을 사용한다 또한 다음과같은 약식 naming을 적용할수 있다. `#v-router > ._children`
4. 되도록 모든 color값은 (variables.scss)[./src/assets/styles/common/variables.scs]에서 관리되어야 하며 예외적인 color값들은 [여기](./CSSNOTICE.md)에 기록한다.

===

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

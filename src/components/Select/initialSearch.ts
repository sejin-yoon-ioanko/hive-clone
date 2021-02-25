// [TODO]: 웹 어셈블리로 컨버트 해서 성능 향상시키기

/**
 * #spec
 * 1. 검색 옵션 나눔 ( 성능향상을 위해서 )
 *    - 단어 통채로의 match 검색 => @function getSearchEngine(false)
 *    - 초성, 중성, 종성 검색 => @function getSearchEngine(true)
 *      EX) { 질의: ㅅㅈ, 검색 list: ['세진', '진세'] } => 결과: ['세진']
 * 2. '검색해야하는 list'들은 비동기적으로 달라질수 있으므로 '검색해야 하는 list'의 반응형으로 작성
 * 3. 질의문의 어순에 따라 검색결과 나오며 단어별검색 X (통짜검색), 대소문자구분 X @function textResolver
 */
import resolveHangul from '@/utils/resolveHangul'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

type useSearchPropsParam = {
  items: ComsSelectValue[];
}

const getSearchFunctionsByOption = (isInitialSearch: boolean) => {
  const textResolver =
    isInitialSearch
      ? (t: string) => t.toLocaleLowerCase().split('').map(char => {
        const resolvedHangul = resolveHangul(char)
        return resolvedHangul
          ? `${resolvedHangul.cho}${resolvedHangul.jung}${resolvedHangul.jong}`
          : char
      })
      : (t: string) => t.toLocaleLowerCase()
  
  const doSearch =
    isInitialSearch
      ? (item: string[], query: string[]) => {
        let firstCharMatchIndex = item.findIndex(ic => ic.match(query[0]))
        if (firstCharMatchIndex === -1) return false
  
        for (let id = 1; id < query.length; id++) {
          firstCharMatchIndex++

          if (!item[firstCharMatchIndex]) return false // #test-case 01
          if (!item[firstCharMatchIndex].match(query[id])) return false
        }
  
        return true
      }
      : (item: string, query: string) => item.match(query)

  return {
    textResolver,
    doSearch
  }
}


/**
 * @param props props값은 그 자체로 반응형이지만 함수의 인자값으로 넘겨줄때 특정 key로 넘겨주면 반응형이 사라진다.
 * 초성, 중성, 종성 검색
 */
function useInitialSearch(
  {
    props,
    query,
    display,
    isInitialSearch
  }: {
    props: useSearchPropsParam;
    query: Ref<string>;
    display: Ref<boolean>;
    isInitialSearch: boolean;
  }
) {
  const { textResolver, doSearch } = getSearchFunctionsByOption(isInitialSearch)

  function resolveItemsSearchValue (items: ComsSelectValue[]) {
    return items.map( item => textResolver(item.text) )
  }

  let resolveCharItemsOrigin = resolveItemsSearchValue(props.items)
  const resultItems = ref<ComsSelectValue[]>([...props.items])

  function getSearchResult(newQuery: string) {
    if (!newQuery) return props.items

    const resolveQuery = textResolver(newQuery)
    const newItems: ComsSelectValue[] = []
    resolveCharItemsOrigin.forEach((item, index) => {
      if (item.length < resolveQuery.length) return false

      if (doSearch(item as string[] & string, resolveQuery as string[] & string)) newItems.push(props.items[index])
    })

    return newItems
  }

  watch(() => props.items, newItems => {
    resolveCharItemsOrigin = resolveItemsSearchValue(newItems)
    resultItems.value = getSearchResult(query.value)
  })
  watch(query, newQuery => {
    resultItems.value = getSearchResult(newQuery)
  })
  watch(display, nowDisplay => {
    if (!nowDisplay && query.value) resultItems.value = props.items
  })
  return {
    resultItems
  }
}

export {
  useInitialSearch as default,
  useInitialSearch
}
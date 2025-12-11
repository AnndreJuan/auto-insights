'use client'

import { useRouter, useSearchParams } from "next/navigation"
import type { NavigateFn, SearchRecord } from "./use-table-url-state"

export function useUrlNavigate(): {
  search: SearchRecord
  navigate: NavigateFn
} {
  const rawSearchParams = useSearchParams()
  const router = useRouter()

  const search = Object.fromEntries(rawSearchParams.entries())

  const navigate: NavigateFn = ({ search: input, replace }) => {
    let next: SearchRecord

    // transforma o input no objeto final
    if (typeof input === "function") {
      next = input(search)
    } else if (input === true) {
      next = search
    } else {
      next = { ...search, ...input }
    }

    // monta os query params
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(next)) {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value))
      }
    }

    const url = `?${params.toString()}`

    if (replace) router.replace(url)
    else router.push(url)
  }

  return { search, navigate }
}

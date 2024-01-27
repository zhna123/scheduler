'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";


export function EditButton({deviceId, type}: {deviceId: string, type: string}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  

  function onEditClick() {
    const params = new URLSearchParams(searchParams);
    params.set('modal', 'true')
    params.set('deviceId', deviceId)
    params.set('type', type)
    params.set('edit', 'true')
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <button className="bg-[url('/icons/edit.svg')] w-6 h-6" id="edit" aria-label="edit" onClick={onEditClick}></button>
  )
}
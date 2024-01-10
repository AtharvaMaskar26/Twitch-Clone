"use client"

// Importing React Dependencies
import React, { useState } from 'react'
import qs from "query-string"
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {Input} from '@/components/ui/input'
import {Button} from "@/components/ui/button"


type Props = {}

function Search({}: Props) {
    const router = useRouter();
    const [value, setValue] = useState("");


    // While searching for someone in the search bar, this following function will change the url and query the data. 
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl({
            url: "/search", 
            query: {term: value}, 
        }, {skipEmptyString: true});

        router.push(url);
    };

    
    // This clears the value of the state once X is clicked
    const onClear = () => {
        setValue("");
    }

  return (
    <form 
        action=""
        onSubmit={onSubmit}
        className='relative w-full lg:w-[400px] flex items-center'>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search'
                className='rounded-r-none focus-visible:ring:0 focus-visible:ring-transparent focus-visible:ring-offset-0'
            />
            {
                value && (
                    <X
                        className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
                        onClick={onClear}
                    />
                )
            }
            <Button
                type='submit'
                size='sm'
                variant={'secondary'}
                className='rounded-l-none'
            >
                <SearchIcon
                    className='h-5 w-5 text-muted-foreground'
                />
            </Button>

    </form>
  )
}

export default Search
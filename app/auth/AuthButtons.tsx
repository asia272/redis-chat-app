import { Button } from '@/components/ui/button'
import React from 'react'

const AuthButtons = () => {
    return (
        <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'>
            <Button variant={"outline"} >
                Sign up
            </Button>
            <Button >
                Login
            </Button>
        </div>
    )
}

export default AuthButtons
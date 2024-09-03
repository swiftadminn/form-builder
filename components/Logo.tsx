import React from 'react';
import Link from "next/link";

function Logo() {
    return <Link href={"/"} className={"font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"}>
            PageForm
    </Link>
}

export default Logo;
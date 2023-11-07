import Logo from '../assets/Logo.svg'

export function Navbar() {
    return (
        <>
            <nav className='h-[12.5rem] w-full bg-gray-700'>
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={Logo} alt="Todo logo"/>
                </div>
            </nav>
        </>
    )
}
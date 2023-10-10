class Header extends HTMLElement{
    constructor(){
        super()
    }
   
    connectedCallback(){
        this.innerHTML = `
        <header class="header" >
        <div class="logo" >
            <img  src="" alt="Smart Assessor logo" />
        </div>
        <nav>
            <ul>
                <a href="#" ><button><li>Login</li></button></a>
               <a href="#" ><button><li>Register</li></button></a>
            </ul>
        </nav>
    </header>
        `;
    }
}

customElements.define('header-element', Header);


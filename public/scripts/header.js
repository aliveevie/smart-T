class Header extends HTMLElement{
    constructor(){
        super()
    }
   
    connectedCallback(){
        this.innerHTML = `
        <header class="header" >
        <div class="logo" >
            <img  src="./icons/logo.png" alt="Smart Assessor logo" />
        </div>
        <nav>
            <ul>
                <a href="./views/login.html" ><button><li>Login</li></button></a>
               <a href="#register" ><button><li>Register</li></button></a>
            </ul>
        </nav>
    </header>
        `;
    }
}

customElements.define('header-element', Header);


<header class ="header">
    <nav class="navbar navbar-expand-md navbar-light bg-light front">
        <div class="container border-bottom">
            <a class="navbar-brand" href=""><img class="logo"
                    src="/core/assets/images/logo.png" width="35" height="35">
                <h1 class="logo text-dark">{{ appName }}</h1>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse col-12 col-md-auto mb-2 justify-content-center mb-md-0"
                id="navbarNavDropdown">
                <ul class="navbar-nav container align-items-md-center">
                    <li class="nav-item me-auto">
                        <a id="browse" class="nav-link" href="?page=home">Home</a>
                    </li>
                    <li class="nav-item me-3">
                        <div class="nav-link navCart">
                            <!-- Emit to Event bus, stored in app.js, this event bus is visible to all components -->
                            <img class="navCartImg" src="/core/assets/images/icons/cart.svg"
                                onclick="Event.$emit('showCart', [])">
                            <span class="cartAmount badge bg-primary"></span>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="navUserDropdown nav-link dropdown-toggle" href="#"
                            id="navbarDropdownMenuLink" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img class="navUserDropdownImg"
                                src="/core/assets/images/icons/person.svg" alt="User Dropdown">
                        </a>
                        <ul class="dropdown-menu"
                            aria-labelledby="navbarDropdownMenuLink">
                            <?php
                            // if NOT logged in, display register
                                if(!isset($_COOKIE["user"])) { ?>
                                    <li><a id="navSignup" class="dropdown-item navSignup"
                                            href="/register"><img class="navSignupImg"
                                                src="/core/assets/images/icons/person-plus.svg">
                                            Signup</a></li>
                            <?php
                                }
                            ?>
                            <?php
                            // if NOT logged in, display login
                                if(!isset($_COOKIE["user"])) { ?>
                                    <li><a id="navLogin" class="dropdown-item navLogin"
                                            href="/login">Login</a>
                                    </li>
                            <?php
                                }
                            ?>
                            <?php
                            // if logged in, display logout
                                if(isset($_COOKIE["user"])) { ?>
                                    <li><a id="navLogout" class="dropdown-item navLogout"
                                            href="" onclick="Event.$emit('logout', [])">Logout</a>
                                    </li>
                            <?php
                                }
                            ?>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

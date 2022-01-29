<?php require('partials/head.php'); ?>

    <h1>Register</h1>
    <form method="POST" action="/register">
        <input type="text" name="first_name" placeholder="First name"><br />
        <input type="text" name="last_name" placeholder="Last name"><br />
        <input type="email" name="email" placeholder="Email"><br />
        <input type="password" name="password" placeholder="Password"><br />
        <input type="submit" value="Register">
    </form>

<?php require('partials/footer.php'); ?>


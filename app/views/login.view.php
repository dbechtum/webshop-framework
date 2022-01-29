<?php require('partials/head.php'); ?>

    <h1>Login</h1>
    <form method="POST" action="/login">
        <label>Email</label><input type="text" name="email" required><br />
        <label>Password</label><input type="password" name="password" required><br />
        <input type="submit" value="Login">
    </form>

<?php require('partials/footer.php'); ?>


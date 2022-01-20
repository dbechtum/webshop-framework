<?php require('partials/head.php'); ?>
    
    <h1>Users</h1>
    <?php foreach ($users as $user) : ?>
        <li><?= $user->name; ?></li>
    <?php endforeach; ?>

    <h1>Register</h1>
    <form method="POST" action="/register">
        <input name="name"></input>
        <button type="submit">Submit</button>
    </form>

<?php require('partials/footer.php'); ?>


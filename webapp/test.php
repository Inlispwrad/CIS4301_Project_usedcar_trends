#!/usr/local/bin/php
<html>

<head>

    <title>
        Search Data - CIS4301 Group 30 Project
    </title>

</head>

<body>
    <?php 
        $connection = oci_connect( $username = 'jinliin',
                                    $password = 'MUQt2jqlHuJSBhjxkdNVRZJD',
                                    $connection_string = '//oracle.cise.ufl.edu/orcl'
                                );
        $statement = oci_parse($connection, 'SELECT * FROM used_car');
        oci_execute($statement);

        while(($row = oci_fetch_object($statement))){
            var_dump($row);
        }
        
        oci_free_statement($statement);
        oci_close($connection);
    ?>
</body>

</html>
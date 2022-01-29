<?php

class QueryBuilder{
    protected $pdo;
    public function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }

    public function fetchAll($table){
        $statement = $this->pdo->prepare("select * from {$table}");
        $statement->execute();
        
        return $statement->fetchAll(PDO::FETCH_CLASS);
    }
    
    public function fetch($input){
        $statement = $this->pdo->prepare($input);
        $statement->execute();
        
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function insert($table, $parameters){
        $sql = sprintf(
            'insert into %s (%s) values (%s)',
            $table,
            implode(', ', array_keys($parameters)),
            ':' . implode(', :', array_keys($parameters))
        );
        
        try{
            $statement = $this->pdo->prepare($sql);
            $statement->execute($parameters);
        } catch (Exception $e) {
            die('Whoops, something went wrong: ' . $e);
        }
    }
}
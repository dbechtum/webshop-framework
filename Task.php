<?php

class Task {
    protected $description;
    protected $completed;

    public function isComplete(){
        if(strtolower($this->completed) == "false") {
            return false;
        }
        return true;
    }
    public function setCompleted(){
        $this->completed = true;
    }
    public function getDescription(){
        return $this->description;
    }
}
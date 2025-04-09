<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
#[Route('/', name: 'home')]
public function index() {
    return $this->render('index.html.twig');
}

    #[Route('/login', name: 'login')]
    public function login() {
        return $this->render('login.html.twig');
    }
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    #[Route('/admin_home', name: 'indexAdmin')]
    public function indexAdmin() {
        return $this->render('admin/home_admin.html.twig');
    }
}
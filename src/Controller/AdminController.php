<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    #[Route('/admin/admin_home', name: 'indexAdmin')]
    public function indexAdmin() {
        return $this->render('admin/home_admin.html.twig');
    }

    #[Route('admin/catalogue', name: 'catalogue')]
    public function catalogue() {
        return $this->render('admin/catalogue.html.twig');
    }
}
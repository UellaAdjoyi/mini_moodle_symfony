<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ProfsController extends AbstractController
{
    #[Route('/profs', name: 'app_profs')]
    public function index(): Response
    {
        return $this->render('profs/page_ue_prof.html.twig', [
            'controller_name' => 'ProfsController',
        ]);
    }
}

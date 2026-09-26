import type { ProcessStep } from '@/types';

/** METHODE DE TRAVAIL, en 6 etapes. */
export const processSteps: ProcessStep[] = [
  {
    id: 'understand',
    step: '01',
    title: 'Comprendre',
    description: 'Analyse du besoin et des objectifs réels du projet.',
    details: [
      'Entretien de cadrage',
      'Analyse des processus existants',
      'Définition des objectifs',
    ],
  },
  {
    id: 'design',
    step: '02',
    title: 'Concevoir',
    description: 'Architecture technique et conception UI/UX.',
    details: ['Architecture des données', 'Wireframes et maquettes', 'Choix de la stack'],
  },
  {
    id: 'build',
    step: '03',
    title: 'Développer',
    description: 'Développement avec des technologies modernes.',
    details: ['Code lisible et versionné', 'Composants réutilisables', 'Revues régulières'],
  },
  {
    id: 'test',
    step: '04',
    title: 'Tester',
    description: 'Tests, optimisation et correction des erreurs.',
    details: ['Tests fonctionnels', 'Responsive et accessibilité', 'Optimisation des performances'],
  },
  {
    id: 'deploy',
    step: '05',
    title: 'Déployer',
    description: 'Mise en production et configuration.',
    details: ['Build automatisé', 'Déploiement CI/CD', 'Configuration des environnements'],
  },
  {
    id: 'maintain',
    step: '06',
    title: 'Maintenir',
    description: 'Évolution et maintenance de la solution.',
    details: ['Corrections et mises à jour', 'Évolutions fonctionnelles', 'Support technique'],
  },
];

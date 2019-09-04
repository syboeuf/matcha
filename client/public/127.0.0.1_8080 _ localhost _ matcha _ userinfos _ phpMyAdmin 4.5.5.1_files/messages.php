var PMA_messages = new Array();
PMA_messages['strNoDropDatabases'] = "La commande «DROP DATABASE» est désactivée.";
PMA_messages['strConfirm'] = "Confirmer";
PMA_messages['strDoYouReally'] = "Voulez-vous vraiment exécuter «%s» ?";
PMA_messages['strDropDatabaseStrongWarning'] = "Vous êtes sur le point de DÉTRUIRE une base de données !";
PMA_messages['strDropTableStrongWarning'] = "Vous êtes sur le point de DÉTRUIRE une table au complet !";
PMA_messages['strTruncateTableStrongWarning'] = "Vous êtes sur le point de VIDER une table au complet !";
PMA_messages['strDeleteTrackingData'] = "Supprimer les données de suivi pour cette table ?";
PMA_messages['strDeleteTrackingDataMultiple'] = "Supprimer les données de suivi pour ces tables ?";
PMA_messages['strDeleteTrackingVersion'] = "Supprimer les données de suivi pour cette version ?";
PMA_messages['strDeleteTrackingVersionMultiple'] = "Supprimer les données de suivi pour ces versions ?";
PMA_messages['strDeletingTrackingEntry'] = "Supprimer l\'entrée du rapport de suivi ?";
PMA_messages['strDeletingTrackingData'] = "Suppression des données de suivi";
PMA_messages['strDroppingPrimaryKeyIndex'] = "Destruction de clé primaire / index";
PMA_messages['strDroppingForeignKey'] = "Suppression de la clé étrangère.";
PMA_messages['strOperationTakesLongTime'] = "Cette opération pourrait être longue. Procéder quand même ?";
PMA_messages['strDropUserGroupWarning'] = "Voulez-vous vraiment supprimer le groupe «%s» ?";
PMA_messages['strConfirmDeleteQBESearch'] = "Voulez-vous vraiment supprimer la recherche «%s» ?";
PMA_messages['strConfirmNavigation'] = "Des changements n\'ont pas été sauvegardés; êtes-vous sûr de vouloir quitter cette page ?";
PMA_messages['strDropUserWarning'] = "Voulez-vous vraiment supprimer les utilisateurs sélectionnés ?";
PMA_messages['strDeleteCentralColumnWarning'] = "Voulez-vous vraiment supprimer cette colonne centrale ?";
PMA_messages['strDropRTEitems'] = "Voulez-vous vraiment supprimer les éléments sélectionnés ?";
PMA_messages['strDropPartitionWarning'] = "Voulez-vous vraiment supprimer les partitions sélectionnées ? Cela va également supprimer les données associées aux partitions sélectionnées !";
PMA_messages['strTruncatePartitionWarning'] = "Voulez-vous vraiment tronquer les partitions sélectionnées ?";
PMA_messages['strResetSlaveWarning'] = "Voulez-vous vraiment exécuter « RESET SLAVE » ?";
PMA_messages['strChangeColumnCollation'] = "Cette opération va tenter de convertir vos données dans le nouveau classement. Dans de rares cas, particulièrement où un caractère n\'existe pas dans le nouveau classement, ce processus pourrait causer un mauvais affichage des données dans le nouveau classement; dans ce cas nous vous suggérons de revenir au classement original et de consulter les conseils à <a href=\"%s\" target=\"garbled_data_wiki\">Données déformées</a>.<br/><br/>Êtes-vous certain de vouloir modifier le classement et de convertir les données ?";
PMA_messages['strChangeAllColumnCollationsWarning'] = "Par cette opération, MySQL tente de mapper les valeurs de données entre les classements. Si les jeux de caractères sont incompatibles, il peut y avoir perte de données et ces données perdues peuvent <b>NE PAS</b> être récupérables simplement en changeant la colonne de classement. <b>Pour convertir les données existantes, il est conseillé d\'utiliser le mode d\'édition de colonne (le lien \"Modifier\") sur la page de structure de table.</b><br/><br/>Êtes-vous certain de vouloir modifier le classement de toutes les colonnes et de convertir les données ?";
PMA_messages['strSaveAndClose'] = "Sauvegarder et fermer";
PMA_messages['strReset'] = "Réinitialiser";
PMA_messages['strResetAll'] = "Tout réinitialiser";
PMA_messages['strFormEmpty'] = "Formulaire incomplet !";
PMA_messages['strRadioUnchecked'] = "Sélectionnez au moins l\'une des options !";
PMA_messages['strEnterValidNumber'] = "Veuillez saisir un nombre valide !";
PMA_messages['strEnterValidLength'] = "Veuillez saisir une longueur valide !";
PMA_messages['strAddIndex'] = "Ajouter un index";
PMA_messages['strEditIndex'] = "Modifier un index";
PMA_messages['strAddToIndex'] = "Ajouter %s colonne(s) à l\'index";
PMA_messages['strCreateSingleColumnIndex'] = "Créer un index sur une seule colonne";
PMA_messages['strCreateCompositeIndex'] = "Créer un index sur plusieurs colonnes";
PMA_messages['strCompositeWith'] = "Autres colonnes formant l\'index :";
PMA_messages['strMissingColumn'] = "Veuillez sélectionner les colonnes de l\'index.";
PMA_messages['strLeastColumnError'] = "Vous devez ajouter au moins une colonne.";
PMA_messages['strPreviewSQL'] = "Aperçu SQL";
PMA_messages['strSimulateDML'] = "Simuler la requête";
PMA_messages['strMatchedRows'] = "Lignes correspondantes :";
PMA_messages['strSQLQuery'] = "Requête SQL : ";
PMA_messages['strYValues'] = "Valeurs en Y";
PMA_messages['strHostEmpty'] = "Le nom de serveur est vide !";
PMA_messages['strUserEmpty'] = "Le nom d\'utilisateur est vide !";
PMA_messages['strPasswordEmpty'] = "Le mot de passe est vide !";
PMA_messages['strPasswordNotSame'] = "Les mots de passe doivent être identiques !";
PMA_messages['strRemovingSelectedUsers'] = "Effacement des utilisateurs sélectionnés";
PMA_messages['strClose'] = "Fermer";
PMA_messages['strTemplateCreated'] = "Le modèle a été créé.";
PMA_messages['strTemplateLoaded'] = "Le modèle a été chargé.";
PMA_messages['strTemplateUpdated'] = "Le modèle a été modifié.";
PMA_messages['strTemplateDeleted'] = "Le modèle a été supprimé.";
PMA_messages['strOther'] = "Autres";
PMA_messages['strThousandsSeparator'] = " ";
PMA_messages['strDecimalSeparator'] = ",";
PMA_messages['strChartConnectionsTitle'] = "Connexions / Processus";
PMA_messages['strIncompatibleMonitorConfig'] = "La configuration locale de la surveillance est incompatible !";
PMA_messages['strIncompatibleMonitorConfigDescription'] = "La configuration du graphique dans votre stockage local du navigateur n\'est plus compatible avec l\'interface de surveillance. Votre configuration courante ne fonctionnera probablement pas. Veuillez réinitialiser votre configuration via le menu <i>Paramètres</i>.";
PMA_messages['strQueryCacheEfficiency'] = "Efficacité du cache de requêtes";
PMA_messages['strQueryCacheUsage'] = "Utilisation du cache de requêtes";
PMA_messages['strQueryCacheUsed'] = "Cache de requêtes utilisé";
PMA_messages['strSystemCPUUsage'] = "Utilisation processeur";
PMA_messages['strSystemMemory'] = "Mémoire système";
PMA_messages['strSystemSwap'] = "Zone d\'échange";
PMA_messages['strAverageLoad'] = "Charge moyenne";
PMA_messages['strTotalMemory'] = "Mémoire système";
PMA_messages['strCachedMemory'] = "Mémoire cache";
PMA_messages['strBufferedMemory'] = "Mémoire-tampon";
PMA_messages['strFreeMemory'] = "Mémoire libre";
PMA_messages['strUsedMemory'] = "Mémoire utilisée";
PMA_messages['strTotalSwap'] = "Zone d\'échange totale";
PMA_messages['strCachedSwap'] = "Zone d\'échange en cache";
PMA_messages['strUsedSwap'] = "Zone d\'échange utilisée";
PMA_messages['strFreeSwap'] = "Zone d\'échange libre";
PMA_messages['strBytesSent'] = "Octets envoyés";
PMA_messages['strBytesReceived'] = "Octets reçus";
PMA_messages['strConnections'] = "Connexions";
PMA_messages['strProcesses'] = "Processus";
PMA_messages['strB'] = "o";
PMA_messages['strKiB'] = "Kio";
PMA_messages['strMiB'] = "Mio";
PMA_messages['strGiB'] = "Gio";
PMA_messages['strTiB'] = "Tio";
PMA_messages['strPiB'] = "Pio";
PMA_messages['strEiB'] = "Eio";
PMA_messages['strNTables'] = "%d table(s)";
PMA_messages['strQuestions'] = "Questions";
PMA_messages['strTraffic'] = "Trafic";
PMA_messages['strSettings'] = "Paramètres";
PMA_messages['strAddChart'] = "Ajouter graphique à la grille";
PMA_messages['strAddOneSeriesWarning'] = "Veuillez ajouter au moins une variable à la série !";
PMA_messages['strNone'] = "Aucune";
PMA_messages['strResumeMonitor'] = "Reprendre la surveillance";
PMA_messages['strPauseMonitor'] = "Mettre la surveillance en pause";
PMA_messages['strStartRefresh'] = "Lancer l\'actualisation automatique";
PMA_messages['strStopRefresh'] = "Arrêter l\'actualisation automatique";
PMA_messages['strBothLogOn'] = "general_log et slow_query_log sont activés.";
PMA_messages['strGenLogOn'] = "general_log est activé.";
PMA_messages['strSlowLogOn'] = "slow_query_log est activé.";
PMA_messages['strBothLogOff'] = "general_log et slow_query_log sont désactivés.";
PMA_messages['strLogOutNotTable'] = "log_output n\'est pas réglé à TABLE.";
PMA_messages['strLogOutIsTable'] = "log_output est réglé à TABLE.";
PMA_messages['strSmallerLongQueryTimeAdvice'] = "slow_query_log est activé, mais le serveur n\'enregistre que les requêtes qui prennent plus de %d secondes. Il est recommandé de régler long_query_time à 0-2 secondes, selon votre système.";
PMA_messages['strLongQueryTimeSet'] = "long_query_time est réglé à %d seconde(s).";
PMA_messages['strSettingsAppliedGlobal'] = "Les réglages suivants seront appliqués globalement et remis à la valeur par défaut lors du rémarrage du serveur : ";
PMA_messages['strSetLogOutput'] = "Régler log_output à %s";
PMA_messages['strEnableVar'] = "Activer %s";
PMA_messages['strDisableVar'] = "Désactiver %s";
PMA_messages['setSetLongQueryTime'] = "Régler long_query_time à %d secondes.";
PMA_messages['strNoSuperUser'] = "Vous ne pouvez changer ces variables. Connectez-vous en tant que root ou contactez l\'administrateur du serveur.";
PMA_messages['strChangeSettings'] = "Changer les paramètres";
PMA_messages['strCurrentSettings'] = "Paramètres courants";
PMA_messages['strChartTitle'] = "Titre du graphique";
PMA_messages['strDifferential'] = "Différentiel";
PMA_messages['strDividedBy'] = "Divisé par %s";
PMA_messages['strUnit'] = "Unité";
PMA_messages['strFromSlowLog'] = "Depuis le journal des requêtes lentes";
PMA_messages['strFromGeneralLog'] = "Depuis le journal général";
PMA_messages['strServerLogError'] = "Le nom de la base de données n\'est pas connu pour cette requête dans les logs du serveur.";
PMA_messages['strAnalysingLogsTitle'] = "Analyse des journaux en cours";
PMA_messages['strAnalysingLogs'] = "Analyse et chargement des journaux en cours. Ceci peut prendre un certain temps.";
PMA_messages['strCancelRequest'] = "Annuler la requête";
PMA_messages['strCountColumnExplanation'] = "Cette colonne montre le nombre de requêtes identiques qui sont regroupées. Cependant, seulement le texte SQL de la requête a été utilisé comme critère de regroupement, donc les autres propriétés des requêtes, comme l\'heure de début, peuvent différer.";
PMA_messages['strMoreCountColumnExplanation'] = "Puisque le groupement des requêtes INSERT a été sélectionné, les requêtes INSERT vers une même table sont groupées, peu importe les données insérées.";
PMA_messages['strLogDataLoaded'] = "Fichier journal chargé. Requêtes exécutées dans ce laps de temps : ";
PMA_messages['strJumpToTable'] = "Aller à la table du journal";
PMA_messages['strNoDataFoundTitle'] = "Aucune donnée";
PMA_messages['strNoDataFound'] = "Journal analysé, mais aucune donnée trouvée pour ce laps de temps.";
PMA_messages['strAnalyzing'] = "Analyse en cours…";
PMA_messages['strExplainOutput'] = "Expliquer les résultats";
PMA_messages['strStatus'] = "État";
PMA_messages['strTime'] = "Moment";
PMA_messages['strTotalTime'] = "Temps total : ";
PMA_messages['strProfilingResults'] = "Profilage des résultats";
PMA_messages['strTable'] = "Table";
PMA_messages['strChart'] = "Tableau";
PMA_messages['strFiltersForLogTable'] = "Options de filtrage de la table journal";
PMA_messages['strFilter'] = "Filtre";
PMA_messages['strFilterByWordRegexp'] = "Filtrer les requêtes par mot ou expression régulière : ";
PMA_messages['strIgnoreWhereAndGroup'] = "Grouper les requêtes en ignorant la partie variable des clauses WHERE";
PMA_messages['strSumRows'] = "Somme des lignes regroupées : ";
PMA_messages['strTotal'] = "Total : ";
PMA_messages['strLoadingLogs'] = "Chargement des journaux en cours";
PMA_messages['strRefreshFailed'] = "Échec de rafraîchissement de la surveillance";
PMA_messages['strInvalidResponseExplanation'] = "Le serveur a retourné une réponse invalide. Votre session a probablement expiré. Veuillez recharger la page et vous connecter à nouveau.";
PMA_messages['strReloadPage'] = "Recharger la page";
PMA_messages['strAffectedRows'] = "Lignes modifiées : ";
PMA_messages['strFailedParsingConfig'] = "Échec d\'analyse du fichier de configuration. Il ne contient pas de code JSON valide.";
PMA_messages['strFailedBuildingGrid'] = "Échec de construction du graphique avec la configuration importée. Réinitialisation à la configuration par défaut…";
PMA_messages['strImport'] = "Importer";
PMA_messages['strImportDialogTitle'] = "Importer la configuration de surveillance";
PMA_messages['strImportDialogMessage'] = "Veuillez choisir le fichier à importer.";
PMA_messages['strNoImportFile'] = "Aucun fichier disponible sur le serveur pour une importation !";
PMA_messages['strAnalyzeQuery'] = "Analyser la requête";
PMA_messages['strAdvisorSystem'] = "Conseiller";
PMA_messages['strPerformanceIssues'] = "Impact de performance possible";
PMA_messages['strIssuse'] = "Problème";
PMA_messages['strRecommendation'] = "Recommandation";
PMA_messages['strRuleDetails'] = "Détails de règle";
PMA_messages['strJustification'] = "Alignement";
PMA_messages['strFormula'] = "Variable / formule utilisée";
PMA_messages['strTest'] = "Test";
PMA_messages['strFormatting'] = "Formatage SQL…";
PMA_messages['strGo'] = "Exécuter";
PMA_messages['strCancel'] = "Annuler";
PMA_messages['strPageSettings'] = "Paramètres liés à la page";
PMA_messages['strApply'] = "Appliquer";
PMA_messages['strLoading'] = "Chargement en cours…";
PMA_messages['strAbortedRequest'] = "Requête abandonnée !";
PMA_messages['strProcessingRequest'] = "Requête en traitement";
PMA_messages['strRequestFailed'] = "Échec de cette requête !";
PMA_messages['strErrorProcessingRequest'] = "Erreur dans le traitement de la requête";
PMA_messages['strErrorCode'] = "Code d\'erreur : %s";
PMA_messages['strErrorText'] = "Texte de l\'erreur : %s";
PMA_messages['strNoDatabasesSelected'] = "Aucune base de données n\'a été sélectionnée.";
PMA_messages['strDroppingColumn'] = "Suppression de la colonne";
PMA_messages['strAddingPrimaryKey'] = "Ajout de clé primaire";
PMA_messages['strOK'] = "OK";
PMA_messages['strDismiss'] = "Cliquer pour éliminer ce message";
PMA_messages['strRenamingDatabases'] = "Changement de nom de la base de données";
PMA_messages['strCopyingDatabase'] = "Copie de la base de données";
PMA_messages['strChangingCharset'] = "Changement du jeu de caractères";
PMA_messages['strNo'] = "Non";
PMA_messages['strForeignKeyCheck'] = "Activer la vérification des clés étrangères";
PMA_messages['strErrorRealRowCount'] = "Impossible d\'obtenir le nombre réel de lignes.";
PMA_messages['strSearching'] = "En recherche";
PMA_messages['strHideSearchResults'] = "Cacher les résultats de recherche";
PMA_messages['strShowSearchResults'] = "Afficher les résultats de recherche";
PMA_messages['strBrowsing'] = "Affichage en cours";
PMA_messages['strDeleting'] = "Destruction en cours";
PMA_messages['MissingReturn'] = "La définition d\'une fonction doit comporter un énoncé RETURN !";
PMA_messages['strExport'] = "Exporter";
PMA_messages['enum_editor'] = "Éditeur ENUM/SET";
PMA_messages['enum_columnVals'] = "Valeurs pour la colonne %s";
PMA_messages['enum_newColumnVals'] = "Valeurs pour une nouvelle colonne";
PMA_messages['enum_hint'] = "Saisir chaque valeur dans un champ séparé.";
PMA_messages['enum_addValue'] = "Ajouter %d valeur(s)";
PMA_messages['strImportCSV'] = "Note : si le fichier contient plusieurs tables, elles seront combinées.";
PMA_messages['strHideQueryBox'] = "Cacher zone SQL";
PMA_messages['strShowQueryBox'] = "Montrer zone SQL";
PMA_messages['strEdit'] = "Modifier";
PMA_messages['strDelete'] = "Effacer";
PMA_messages['strNotValidRowNumber'] = "%d n\'est pas un numéro de ligne valable.";
PMA_messages['strBrowseForeignValues'] = "Afficher les valeurs de la table liée";
PMA_messages['strNoAutoSavedQuery'] = "Aucune requête sauvegardée automatiquement";
PMA_messages['strBookmarkVariable'] = "Variable %d :";
PMA_messages['pickColumn'] = "Choisir";
PMA_messages['pickColumnTitle'] = "Sélecteur de colonne";
PMA_messages['searchList'] = "Chercher dans cette liste";
PMA_messages['strEmptyCentralList'] = "Aucune colonne dans la liste centrale. Assurez-vous que la liste de colonnes centrales pour la base de données %s comporte des colonnes qui ne sont pas présentes dans la table actuelle.";
PMA_messages['seeMore'] = "Plus";
PMA_messages['confirmTitle'] = "Êtes-vous certain ?";
PMA_messages['makeConsistentMessage'] = "Cette action peut changer certaines définitions de colonnes. <br/>Êtes-vous sûr de vouloir continuer ?";
PMA_messages['strContinue'] = "Continuer";
PMA_messages['strAddPrimaryKey'] = "Ajouter une clé primaire";
PMA_messages['strPrimaryKeyAdded'] = "Une clé primaire a été ajoutée.";
PMA_messages['strToNextStep'] = "Vous êtes redirigé vers l\'étape suivante…";
PMA_messages['strFinishMsg'] = "La première étape de la normalisation est terminée pour la table «%s».";
PMA_messages['strEndStep'] = "Fin d\'étape";
PMA_messages['str2NFNormalization'] = "Deuxième étape de la normalisation (2FN)";
PMA_messages['strDone'] = "Fermer";
PMA_messages['strConfirmPd'] = "Confirmer les dépendances partielles";
PMA_messages['strSelectedPd'] = "Les dépendances partielles sélectionnées sont les suivantes :";
PMA_messages['strPdHintNote'] = "Remarque: a, b -> d, f implique que les valeurs des colonnes a et b combinées peuvent déterminer les valeurs des colonnes d et f.";
PMA_messages['strNoPdSelected'] = "Pas de dépendances partielles sélectionnées !";
PMA_messages['strBack'] = "Retour";
PMA_messages['strShowPossiblePd'] = "Montrez-moi les dépendances partielles possibles en se basant sur les données de la table";
PMA_messages['strHidePd'] = "Masquer la liste des dépendances partielles";
PMA_messages['strWaitForPd'] = "Soyez patient ! Cela peut prendre quelques secondes selon la taille des données et le nombre de colonnes de la table.";
PMA_messages['strStep'] = "Étape";
PMA_messages['strMoveRepeatingGroup'] = "<ol><b>Les actions suivantes seront effectuées :</b><li>Supprimer les colonnes %s de la table %s</li><li>Créer la table suivante :</li>";
PMA_messages['strNewTablePlaceholder'] = "Enter new table name";
PMA_messages['strNewColumnPlaceholder'] = "Enter column name";
PMA_messages['str3NFNormalization'] = "Troisième étape de la normalisation (3FN)";
PMA_messages['strConfirmTd'] = "Confirmer les dépendances transitives";
PMA_messages['strSelectedTd'] = "Les dépendances sélectionnées sont les suivantes :";
PMA_messages['strNoTdSelected'] = "Aucune dépendance sélectionnée !";
PMA_messages['strSave'] = "Sauvegarder";
PMA_messages['strHideSearchCriteria'] = "Cacher les critères de recherche";
PMA_messages['strShowSearchCriteria'] = "Afficher les critères de recherche";
PMA_messages['strRangeSearch'] = "Recherche en intervalle";
PMA_messages['strColumnMax'] = "Maximum pour la colonne :";
PMA_messages['strColumnMin'] = "Valeur minimum pour la colonne :";
PMA_messages['strMinValue'] = "Valeur minimum :";
PMA_messages['strMaxValue'] = "Valeur maximum :";
PMA_messages['strHideFindNReplaceCriteria'] = "Cacher les critères de recherche et remplacement";
PMA_messages['strShowFindNReplaceCriteria'] = "Afficher les critères de recherche et remplacement";
PMA_messages['strDisplayHelp'] = "<ul><li>Chaque point représente une ligne de données.</li><li>Survoler un point montrera sa description.</li><li>Pour zoomer, sélectionnez une section avec la souris.</li><li>Cliquez le lien «Réinitialiser zoom» pour revenir à l\'état original.</li><li>Cliquez sur un point pour visualiser et possiblement éditer la ligne de données.</li><li>L\'image peut être redimensionnée en faisant glisser le coin inférieur droit.</li></ul>";
PMA_messages['strHelpTitle'] = "Zoom search instructions";
PMA_messages['strInputNull'] = "<strong>Sélectionnez deux colonnes</strong>";
PMA_messages['strSameInputs'] = "<strong>Sélectionnez deux colonnes différentes</strong>";
PMA_messages['strDataPointContent'] = "Données reliées à ce point";
PMA_messages['strIgnore'] = "Ignorer";
PMA_messages['strCopy'] = "Copier";
PMA_messages['strX'] = "X";
PMA_messages['strY'] = "Y";
PMA_messages['strPoint'] = "Point";
PMA_messages['strPointN'] = "Point %d";
PMA_messages['strLineString'] = "Ligne";
PMA_messages['strPolygon'] = "Polygone";
PMA_messages['strGeometry'] = "Géométrie";
PMA_messages['strInnerRing'] = "Anneau intérieur";
PMA_messages['strOuterRing'] = "Anneau extérieur";
PMA_messages['strAddPoint'] = "Ajouter un point";
PMA_messages['strAddInnerRing'] = "Ajouter un anneau intérieur";
PMA_messages['strYes'] = "Oui";
PMA_messages['strCopyEncryptionKey'] = "Voulez-vous copier la clé de cryptage ?";
PMA_messages['strEncryptionKey'] = "Clé de cryptage";
PMA_messages['strLockToolTip'] = "Indique que vous avez fait des modifications à cette page; on vous demandera confirmation avant d\'abandonner les modifications";
PMA_messages['strSelectReferencedKey'] = "Sélectionnez la clé référencée";
PMA_messages['strSelectForeignKey'] = "Choisissez la clé étrangère";
PMA_messages['strPleaseSelectPrimaryOrUniqueKey'] = "Veuillez choisir la clé primaire ou un index unique !";
PMA_messages['strChangeDisplay'] = "Colonne descriptive";
PMA_messages['strLeavingDesigner'] = "Vous n\'avez pas sauvegardé les changements. Ils seront perdus si vous ne les sauvegardez pas. Voulez-vous continuer ?";
PMA_messages['strPageName'] = "Nom de la page";
PMA_messages['strSavePage'] = "Sauvegarder la page";
PMA_messages['strSavePageAs'] = "Sauvegarder la page en tant que";
PMA_messages['strOpenPage'] = "Ouvrir la page";
PMA_messages['strDeletePage'] = "Supprimer la page";
PMA_messages['strUntitled'] = "Sans titre";
PMA_messages['strSelectPage'] = "Veuillez sélectionner une page pour continuer";
PMA_messages['strEnterValidPageName'] = "Veuillez saisir un nom de page valide";
PMA_messages['strLeavingPage'] = "Voulez-vous enregistrer les modifications dans la page en cours ?";
PMA_messages['strSuccessfulPageDelete'] = "La page a été correctement supprimée";
PMA_messages['strExportRelationalSchema'] = "Exporter un schéma relationnel";
PMA_messages['strModificationSaved'] = "Les modifications ont été sauvegardées";
PMA_messages['strAddOption'] = "Ajouter une option pour la colonne «%s».";
PMA_messages['strObjectsCreated'] = "%d objet(s) créé(s).";
PMA_messages['strSubmit'] = "Exécuter";
PMA_messages['strCellEditHint'] = "Appuyez sur la touche d\'échappement pour annuler l\'édition.";
PMA_messages['strSaveCellWarning'] = "Vous avez modifier des données non encore sauvegardées, êtes vous sûr de vouloir quitter cette page avant de sauvegarder ?";
PMA_messages['strColOrderHint'] = "Faire glisser pour réordonner.";
PMA_messages['strSortHint'] = "Cliquer pour trier les résultats sur cette colonne.";
PMA_messages['strMultiSortHint'] = "Maj + clic pour ajouter cette colonne à la clause ORDER BY ou pour basculer ASC/DESC.<br />- Ctrl + clic ou Alt + clic (sur Mac : Maj + Option + Clic) pour enlever la colonne de la clause ORDER BY";
PMA_messages['strColMarkHint'] = "Cliquer pour marquer/enlever les marques.";
PMA_messages['strColNameCopyHint'] = "Double-cliquez pour copier le nom de la colonne.";
PMA_messages['strColVisibHint'] = "Cliquer sur la flèche<br />pour gérer l\'affichage des colonnes.";
PMA_messages['strShowAllCol'] = "Tout afficher";
PMA_messages['strAlertNonUnique'] = "Cette table ne contient pas de colonne unique. Les grilles d\'édition, les cases à cocher ainsi que les liens Edition, Copie et Supprimer pourrait ne plus fonctionner après prise en compte de la modification.";
PMA_messages['strEnterValidHex'] = "Veuillez saisir une chaîne en hexadécimal valide. Les caractères possibles sont 0-9, A-F.";
PMA_messages['strShowAllRowsWarning'] = "Voulez-vous vraiment voir toutes les lignes ? Pour une grande table, cela pourrait faire planter le navigateur.";
PMA_messages['strOriginalLength'] = "Longueur originale";
PMA_messages['dropImportMessageCancel'] = "annuler";
PMA_messages['dropImportMessageAborted'] = "Arrêts prématurés";
PMA_messages['dropImportMessageFailed'] = "Échec";
PMA_messages['dropImportMessageSuccess'] = "Succès";
PMA_messages['dropImportImportResultHeader'] = "État de l\'importation";
PMA_messages['dropImportDropFiles'] = "Déposez des fichiers ici";
PMA_messages['dropImportSelectDB'] = "Choisissez d\'abord une base de données";
PMA_messages['strGridEditFeatureHint'] = "Vous pouvez aussi modifier la plupart des valeurs<br/> en double-cliquant directement sur celles-ci.";
PMA_messages['strGoToLink'] = "Suivre le lien :";
PMA_messages['strColNameCopyTitle'] = "Copier le nom de la colonne.";
PMA_messages['strColNameCopyText'] = "Faites un clic-droit sur le nom de la colonne pour le copier vers le presse-papier.";
PMA_messages['strGeneratePassword'] = "Générer un mot de passe";
PMA_messages['strGenerate'] = "Générer";
PMA_messages['strChangePassword'] = "Modifier le mot de passe";
PMA_messages['strMore'] = "plus";
PMA_messages['strShowPanel'] = "Montrer le panneau";
PMA_messages['strHidePanel'] = "Cacher le panneau";
PMA_messages['strUnhideNavItem'] = "Montrer les éléments de navigation cachés.";
PMA_messages['linkWithMain'] = "Relier au panneau principal";
PMA_messages['unlinkWithMain'] = "Supprimer la liaison au panneau principal";
PMA_messages['strHoverDbFastFilter'] = "Pour filtrer toutes les bases de données sur le serveur, appuyez sur Entrée après un terme de recherche";
PMA_messages['strHoverFastFilter'] = "Pour filtrer tous les %s dans la base de données, appuyez sur Entrée après un terme de recherche";
PMA_messages['strTables'] = "tables";
PMA_messages['strViews'] = "vues";
PMA_messages['strProcedures'] = "procédures";
PMA_messages['strEvents'] = "événements";
PMA_messages['strFunctions'] = "fonctions";
PMA_messages['strInvalidPage'] = "La page demandée n\'existe pas dans l\'historique, elle peut avoir expiré.";
PMA_messages['strNewerVersion'] = "Une nouvelle version de phpMyAdmin est disponible et vous devriez songer à une mise à niveau. La version la plus récente est %s, publiée le %s.";
PMA_messages['strLatestAvailable'] = ", dernière version stable : ";
PMA_messages['strUpToDate'] = "à jour";
PMA_messages['strCreateView'] = "Créer une vue";
PMA_messages['strSendErrorReport'] = "Envoyer le rapport d\'erreurs";
PMA_messages['strSubmitErrorReport'] = "Soumettre un rapport d\'erreurs";
PMA_messages['strErrorOccurred'] = "Une erreur JavaScript fatale s\'est produite. Désirez-vous envoyer un rapport d\'erreur ?";
PMA_messages['strChangeReportSettings'] = "Changer les paramètres du rapport";
PMA_messages['strShowReportDetails'] = "Montrer les détails du rapport";
PMA_messages['strTimeOutError'] = "Votre exportation est incomplète en raison d\'une limite de temps d\'exécution trop basse au niveau PHP !";
PMA_messages['strTooManyInputs'] = "Avis : un formulaire sur cette page contient plus de %d champs. Lors de l\'envoi, certains des champs pourraient être ignorés, en raison de la configuration max_input_vars de PHP.";
PMA_messages['phpErrorsFound'] = "<div class=\"error\">Des erreurs ont été détectées sur le serveur !<br/>Veuillez regarder au bas de cette fenêtre.<div><input id=\"pma_ignore_errors_popup\" type=\"submit\" value=\"Ignorer\" class=\"floatright\" style=\"margin-top: 20px;\"><input id=\"pma_ignore_all_errors_popup\" type=\"submit\" value=\"Ignorer tout\" class=\"floatright\" style=\"margin-top: 20px;\"></div></div>";
PMA_messages['phpErrorsBeingSubmitted'] = "<div class=\"error\">Des erreurs ont été détectées sur le serveur !<br/>Selon vos paramètres, ils sont actuellement soumis, veuillez patienter.<br/><img src=\"./themes/pmahomme/img/ajax_clock_small.gif\" width=\"16\" height=\"16\" alt=\"ajax clock\"/></div>";
PMA_messages['strConsoleRequeryConfirm'] = "Exécuter cette requête à nouveau ?";
PMA_messages['strConsoleDeleteBookmarkConfirm'] = "Voulez-vous vraiment supprimer ce signet ?";
PMA_messages['strConsoleDebugError'] = "Une erreur s\'est produite lors de l\'obtention des informations de débogage SQL.";
PMA_messages['strConsoleDebugSummary'] = "%s requêtes exécutées %s fois en %s secondes.";
PMA_messages['strConsoleDebugArgsSummary'] = "%s arguments passés";
PMA_messages['strConsoleDebugShowArgs'] = "Montrer les arguments";
PMA_messages['strConsoleDebugHideArgs'] = "Cacher les arguments";
PMA_messages['strConsoleDebugTimeTaken'] = "Temps nécessaire :";
PMA_messages['strNoLocalStorage'] = "Un problème est survenu lors de l\'accès au stockage du navigateur, certaines fonctionnalités peuvent ne pas fonctionner pour vous. Il est probable que le navigateur ne prend pas en charge le stockage ou que la limite d\'espace ait été atteinte. Dans Firefox, un stockage corrompu peut également causer ce problème, et vider les « Données de site web hors connexion » peut aider. Dans Safari, ce problème est habituellement causé par l\'utilisation de la « Navigation en mode privé ».";
var themeCalendarImage = './themes/pmahomme/img/b_calendar.png';
var pmaThemeImage = './themes/pmahomme/img/';
var mysql_doc_template = './url.php?url=http%3A%2F%2Fdev.mysql.com%2Fdoc%2Frefman%2F5.5%2Fen%2F%25s.html';
var maxInputVars = 1000;
if ($.datepicker) {
$.datepicker.regional['']['closeText'] = "Fermer";
$.datepicker.regional['']['prevText'] = "Précédent";
$.datepicker.regional['']['nextText'] = "Suivant";
$.datepicker.regional['']['currentText'] = "Aujourd\'hui";
$.datepicker.regional['']['monthNames'] = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre",];
$.datepicker.regional['']['monthNamesShort'] = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre",];
$.datepicker.regional['']['dayNames'] = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi",];
$.datepicker.regional['']['dayNamesShort'] = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam",];
$.datepicker.regional['']['dayNamesMin'] = ["Di","Lu","Ma","Me","Je","Ve","Sa",];
$.datepicker.regional['']['weekHeader'] = "Sem";
$.datepicker.regional['']['showMonthAfterYear'] = false;
$.datepicker.regional['']['yearSuffix'] = "";
$.extend($.datepicker._defaults, $.datepicker.regional['']);
} /* if ($.datepicker) */

if ($.timepicker) {
$.timepicker.regional['']['timeText'] = "Moment";
$.timepicker.regional['']['hourText'] = "Heure";
$.timepicker.regional['']['minuteText'] = "Minute";
$.timepicker.regional['']['secondText'] = "Seconde";
$.extend($.timepicker._defaults, $.timepicker.regional['']);
} /* if ($.timepicker) */

function extendingValidatorMessages() {
$.extend($.validator.messages, {
required: "Ce champ est obligatoire", remote: "Corrigez ce champ", email: "Veuillez saisir une adresse courriel valide", url: "Veuillez saisir une URL valide", date: "Veuillez saisir une date valide", dateISO: "Veuillez saisir une date valide (ISO)", number: "Veuillez saisir un nombre valide", creditcard: "Veuillez saisir un numéro de carte de crédit valide", digits: "Veuillez saisir uniquement des chiffres", equalTo: "Veuillez saisir la même valeur à nouveau", maxlength: $.validator.format("Veuillez saisir au maximum {0} caractères"), minlength: $.validator.format("Veuillez saisir au moins {0} caractères"), rangelength: $.validator.format("Veuillez saisir une valeur d\'une longueur entre {0} et {1} caractères"), range: $.validator.format("Veuillez saisir une valeur entre {0} et {1}"), max: $.validator.format("Veuillez saisir une valeur inférieure ou égale à {0}"), min: $.validator.format("Veuillez saisir une valeur supérieure ou égale à {0}"), validationFunctionForDateTime: $.validator.format("Veuillez saisir une date ou une heure valide"), validationFunctionForHex: $.validator.format("Veuillez saisir une valeur hexadécimale valide"), validationFunctionForFuns: $.validator.format("Erreur")
});
} /* if ($.validator) */
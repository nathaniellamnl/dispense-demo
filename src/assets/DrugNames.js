const drugNames =
    [
        {
            "name": "Omeprazole_Cap E/C 10mg"
        },
        {
            "name": "Dressit Ster Dress Pack"
        },
        {
            "name": "Flaminal Forte 15g Tube Wound Dress Prot"
        },
        {
            "name": "Co-Magaldrox_Susp 195mg/220mg/5ml S/F"
        },
        {
            "name": "Antacid/Oxetacaine_Oral Susp S/F"
        },
        {
            "name": "Simeticone_Susp 40mg/ml S/F"
        },
        {
            "name": "Infacol_Susp 40mg/ml S/F"
        },
        {
            "name": "Gppe Liq_Gaviscon S/F"
        },
        {
            "name": "Sod Algin/Pot Bicarb_Susp S/F"
        },
        {
            "name": "Sod Alginate/Pot Bicarb_Tab Chble 500mg"
        },
        {
            "name": "Gastrocote_Tab"
        },
        {
            "name": "Gaviscon Infant_Sach 2g (Dual Pack) S/F"
        },
        {
            "name": "Gaviscon Advance_Liq (Aniseed) S/F"
        },
        {
            "name": "Gaviscon_Liq Sach 10ml (Peppermint) S/F"
        },
        {
            "name": "Gaviscon Advance_Liq (Peppermint) S/F"
        },
        {
            "name": "Gaviscon Advance_Tab Chble 500mg Mint"
        },
        {
            "name": "Gaviscon Double Action_Tab Chble"
        },
        {
            "name": "Topal_Antacid Tab"
        },
        {
            "name": "Peptac_Liq (Aniseed) S/F"
        },
        {
            "name": "Peptac_Liq (Peppermint) S/F"
        },
        {
            "name": "Alverine Cit_Cap 60mg"
        },
        {
            "name": "Dicycloverine HCl_Tab 10mg"
        },
        {
            "name": "Dicycloverine HCl_Tab 20mg"
        },
        {
            "name": "Hyoscine Butylbrom_Inj 20mg/ml 1ml Amp"
        },
        {
            "name": "Hyoscine Butylbrom_Tab 10mg"
        },
        {
            "name": "Buscopan_Tab 10mg"
        },
        {
            "name": "Mebeverine HCl_Tab 135mg"
        },
        {
            "name": "Mebeverine HCl_Cap 200mg M/R"
        },
        {
            "name": "Colofac_Tab 135mg"
        },
        {
            "name": "Peppermint Oil_Cap E/C 0.2ml"
        },
        {
            "name": "Peppermint Oil_Cap E/C 0.2ml M/R"
        },
        {
            "name": "Colpermin_Cap E/C 0.2ml M/R"
        },
        {
            "name": "Cimetidine_Tab 200mg"
        },
        {
            "name": "Cimetidine_Tab 400mg"
        },
        {
            "name": "Tagamet_Tab 400mg"
        },
        {
            "name": "Ranitidine HCl_Tab 150mg"
        },
        {
            "name": "Ranitidine HCl_Tab 300mg"
        },
        {
            "name": "Ranitidine HCl_Oral Soln 75mg/5ml S/F"
        },
        {
            "name": "Ranitidine HCl_Tab Eff 150mg"
        },
        {
            "name": "Sucralfate_Tab 1g"
        },
        {
            "name": "Esomeprazole_Tab E/C 20mg"
        },
        {
            "name": "Esomeprazole_Tab E/C 40mg"
        },
        {
            "name": "Lansoprazole_Cap 30mg (E/C Gran)"
        },
        {
            "name": "Lansoprazole_Cap 15mg (E/C Gran)"
        },
        {
            "name": "Lansoprazole_Orodisper Tab 15mg"
        },
        {
            "name": "Lansoprazole_Orodisper Tab 30mg"
        },
        {
            "name": "Omeprazole_Cap E/C 20mg"
        },
        {
            "name": "Omeprazole_Cap E/C 40mg"
        },
        {
            "name": "Omeprazole_Tab Disper 20mg (E/C Pellets)"
        },
        {
            "name": "Omeprazole_Tab Disper 40mg (E/C Pellets)"
        },
        {
            "name": "Omeprazole_Tab E/C 20mg"
        },
        {
            "name": "Omeprazole_Tab E/C 40mg"
        },
        {
            "name": "Omeprazole_Oral Susp 20mg/5ml"
        },
        {
            "name": "Losec_Cap E/C 20mg"
        },
        {
            "name": "Pantoprazole_Tab E/C 40mg"
        },
        {
            "name": "Pantoprazole_Tab E/C 20mg"
        },
        {
            "name": "Rabeprazole Sod_Tab E/C 10mg"
        },
        {
            "name": "Rabeprazole Sod_Tab E/C 20mg"
        },
        {
            "name": "Co-Phenotrope_Tab 2.5mg/25mcg"
        },
        {
            "name": "Loperamide HCl_Cap 2mg"
        },
        {
            "name": "Loperamide HCl_Oral Soln 1mg/5ml S/F"
        },
        {
            "name": "Imodium Instants_Tab 2mg"
        },
        {
            "name": "Asacol_MR Tab E/C 400mg"
        },
        {
            "name": "Pentasa SR_Tab 500mg"
        },
        {
            "name": "Pentasa_Tab 1g M/R"
        },
        {
            "name": "Balsalazide Sod_Cap 750mg"
        },
        {
            "name": "Sulfasalazine_Tab 500mg"
        },
        {
            "name": "Sulfasalazine_Tab E/C 500mg"
        },
        {
            "name": "Salazopyrin-En_Tab 500mg"
        },
        {
            "name": "Budesonide_Cap 3mg (E/C Pellets)"
        },
        {
            "name": "Entocort CR_Cap 3mg (E/C M/R Gran)"
        },
        {
            "name": "Hydrocort Acet_Foam Aero Enem 10% (14 D)"
        },
        {
            "name": "Colifoam_Foam Aero Enem 10% 20.8g (14 D)"
        },
        {
            "name": "Sod Cromoglicate_Cap 100mg"
        },
        {
            "name": "Ispag Husk_Gran Eff Sach 3.5g S/F"
        },
        {
            "name": "Ispag Husk_Pdr Sach 3.4g Orange S/F"
        },
        {
            "name": "Ispag Husk_Gran Sach 3.5g G/F"
        },
        {
            "name": "Ispag Husk_Gran Sach 3.5g G/F S/F"
        },
        {
            "name": "Fybogel_Gran Sach 3.5g Orange G/F S/F"
        },
        {
            "name": "Methylcellulose_Tab 500mg"
        },
        {
            "name": "Co-Danthramer_Susp 25mg/200mg/5ml S/F"
        },
        {
            "name": "Co-Danthramer_Cap Strong 37.5mg/500mg"
        },
        {
            "name": "Bisacodyl_Tab E/C 5mg"
        },
        {
            "name": "Bisacodyl_Suppos 10mg"
        },
        {
            "name": "Docusate Sod_Oral Soln 50mg/5ml S/F"
        },
        {
            "name": "Docusate Sod_Cap 100mg"
        },
        {
            "name": "Co-Danthrusate_Cap 50mg/60mg"
        },
        {
            "name": "Glycerol_Suppos Adult\u0027s (4g)"
        },
        {
            "name": "Senna_Tab 7.5mg"
        },
        {
            "name": "Ispaghula/Senna Fruit_Gran 54.2%/12.4%"
        },
        {
            "name": "Senna_Oral Soln 7.5mg/5ml S/F"
        },
        {
            "name": "Manevac_Gran"
        },
        {
            "name": "Sod Picosulf_Oral Soln 5mg/5ml S/F"
        },
        {
            "name": "Sod Picosulf_Cap 2.5mg"
        },
        {
            "name": "Lactulose_Soln 3.1g-3.7g/5ml"
        },
        {
            "name": "Macrogol_Co Oral Pdr Sach S/F"
        },
        {
            "name": "Movicol_Pdr Sach 13.8g (Lem \u0026 Lim)"
        },
        {
            "name": "Movicol Plain_Paed Pdr Sach 6.9g"
        },
        {
            "name": "Laxido_Oral Pdr Sach (Orange)"
        },
        {
            "name": "Laxido_Oral Pdr Sach (Orange) S/F"
        },
        {
            "name": "Phos Enem_(For B) 128ml Stnd Tube"
        },
        {
            "name": "Micralax_Micro-Enem 5ml"
        },
        {
            "name": "Picolax_Pdr Sach 16.3g"
        },
        {
            "name": "Diltiazem HCl_Crm 2%"
        },
        {
            "name": "Anusol_Crm"
        },
        {
            "name": "Anusol_Oint"
        },
        {
            "name": "Anusol_Suppos"
        },
        {
            "name": "Ultraproct_Oint"
        },
        {
            "name": "Ultraproct_Suppos"
        },
        {
            "name": "Cinchocaine HCl/Hydrocort_Oint 0.5%/0.5%"
        },
        {
            "name": "Cinchocaine HCl/Hydrocort_Suppos 5mg/5mg"
        },
        {
            "name": "Lido/Hydrocort Acet_Oint 5%/0.275%"
        },
        {
            "name": "Anugesic HC_Crm"
        },
        {
            "name": "Anugesic HC_Suppos"
        },
        {
            "name": "Anusol HC_Suppos"
        },
        {
            "name": "Anusol HC_Oint"
        },
        {
            "name": "Xyloproct_Oint 5%/0.275%"
        },
        {
            "name": "Cinchocaine/Prednisolone_Oint 0.5%/0.19%"
        },
        {
            "name": "Scheriproct_Oint"
        },
        {
            "name": "Glyceryl Trinit_Oint 0.4%"
        },
        {
            "name": "Ursodeoxycholic Acid_Tab 150mg"
        },
        {
            "name": "Ursodeoxycholic Acid_Cap 250mg"
        },
        {
            "name": "Ursodeoxycholic Acid_Tab 300mg"
        },
        {
            "name": "Creon 25000_Cap E/C"
        },
        {
            "name": "Creon 10000_Cap E/C"
        },
        {
            "name": "Creon 40000_Cap E/C"
        },
        {
            "name": "Digoxin_Tab 62.5mcg"
        },
        {
            "name": "Digoxin_Tab 125mcg"
        },
        {
            "name": "Digoxin_Tab 250mcg"
        },
        {
            "name": "Bendroflumethiazide_Tab 2.5mg"
        },
        {
            "name": "Bendroflumethiazide_Tab 5mg"
        },
        {
            "name": "Indapamide_Tab 2.5mg"
        },
        {
            "name": "Indapamide_Tab 1.5mg M/R"
        },
        {
            "name": "Metolazone_Tab 5mg"
        },
        {
            "name": "Bumetanide_Tab 1mg"
        },
        {
            "name": "Bumetanide_Tab 5mg"
        },
        {
            "name": "Furosemide_Tab 20mg"
        },
        {
            "name": "Furosemide_Tab 40mg"
        },
        {
            "name": "Furosemide_Oral Soln 50mg/5ml S/F"
        },
        {
            "name": "Amiloride HCl_Tab 5mg"
        },
        {
            "name": "Spironol_Tab 25mg"
        },
        {
            "name": "Spironol_Tab 50mg"
        },
        {
            "name": "Spironol_Tab 100mg"
        },
        {
            "name": "Spironol_Oral Susp 50mg/5ml"
        },
        {
            "name": "Eplerenone_Tab 25mg"
        },
        {
            "name": "Co-Amilofruse_Tab 5mg/40mg"
        },
        {
            "name": "Frumil_Tab 40mg/5mg"
        },
        {
            "name": "Amiloride HCl/Bumetanide_Tab 5mg/1mg"
        },
        {
            "name": "Triamterene/Chlortalidone_Tab 50mg/50mg"
        },
        {
            "name": "Amiodarone HCl_Tab 100mg"
        },
        {
            "name": "Amiodarone HCl_Tab 200mg"
        },
        {
            "name": "Flecainide Acet_Tab 50mg"
        },
        {
            "name": "Nebivolol_Tab 2.5mg"
        },
        {
            "name": "Atenolol_Oral Soln 25mg/5ml S/F"
        },
        {
            "name": "Atenolol_Tab 50mg"
        },
        {
            "name": "Atenolol_Tab 100mg"
        },
        {
            "name": "Atenolol_Tab 25mg"
        },
        {
            "name": "Bisoprolol Fumar_Tab 5mg"
        },
        {
            "name": "Bisoprolol Fumar_Tab 10mg"
        },
        {
            "name": "Bisoprolol Fumar_Tab 2.5mg"
        },
        {
            "name": "Bisoprolol Fumar_Tab 7.5mg"
        },
        {
            "name": "Bisoprolol Fumar_Tab 1.25mg"
        },
        {
            "name": "Bisoprolol Fumar_Liq Spec 5mg/5ml"
        },
        {
            "name": "Metoprolol Tart_Tab 50mg"
        },
        {
            "name": "Nadolol_Tab 80mg"
        },
        {
            "name": "Oxprenolol HCl_Tab 40mg"
        },
        {
            "name": "Propranolol HCl_Cap 80mg M/R"
        },
        {
            "name": "Propranolol HCl_Cap 160mg M/R"
        },
        {
            "name": "Propranolol HCl_Tab 10mg"
        },
        {
            "name": "Propranolol HCl_Tab 40mg"
        },
        {
            "name": "Propranolol HCl_Tab 80mg"
        },
        {
            "name": "Propranolol HCl_Oral Soln 50mg/5ml S/F"
        },
        {
            "name": "Sotalol HCl_Tab 40mg"
        },
        {
            "name": "Sotalol HCl_Tab 80mg"
        },
        {
            "name": "Sotalol HCl_Tab 160mg"
        },
        {
            "name": "Co-Tenidone_Tab 50mg/12.5mg"
        },
        {
            "name": "Carvedilol_Tab 12.5mg"
        },
        {
            "name": "Carvedilol_Tab 25mg"
        },
        {
            "name": "Carvedilol_Tab 3.125mg"
        },
        {
            "name": "Carvedilol_Tab 6.25mg"
        },
        {
            "name": "Hydralazine HCl_Tab 25mg"
        },
        {
            "name": "Hydralazine HCl_Tab 50mg"
        },
        {
            "name": "Minoxidil_Tab 5mg"
        },
        {
            "name": "Minoxidil_Tab 10mg"
        },
        {
            "name": "Sildenafil_Tab 20mg"
        },
        {
            "name": "Clonidine HCl_Tab 100mcg"
        },
        {
            "name": "Methyldopa_Tab 125mg"
        },
        {
            "name": "Methyldopa_Tab 250mg"
        },
        {
            "name": "Methyldopa_Tab 500mg"
        },
        {
            "name": "Moxonidine_Tab 200mcg"
        },
        {
            "name": "Moxonidine_Tab 400mcg"
        },
        {
            "name": "Doxazosin Mesil_Tab 1mg"
        },
        {
            "name": "Doxazosin Mesil_Tab 2mg"
        },
        {
            "name": "Doxazosin Mesil_Tab 4mg"
        },
        {
            "name": "Doxazosin Mesil_Tab 4mg M/R"
        },
        {
            "name": "Doxazosin Mesil_Tab 8mg M/R"
        },
        {
            "name": "Phenoxybenz HCl_Cap 10mg"
        },
        {
            "name": "Prazosin HCl_Tab 1mg"
        },
        {
            "name": "Enalapril Mal_Tab 2.5mg"
        },
        {
            "name": "Enalapril Mal_Tab 5mg"
        },
        {
            "name": "Enalapril Mal_Tab 10mg"
        },
        {
            "name": "Enalapril Mal_Tab 20mg"
        },
        {
            "name": "Lisinopril/Hydchloroth_Tab 20mg/12.5mg"
        },
        {
            "name": "Lisinopril/Hydchloroth_Tab 10mg/12.5mg"
        },
        {
            "name": "Zestoretic 20_Tab"
        },
        {
            "name": "Lisinopril_Tab 2.5mg"
        },
        {
            "name": "Lisinopril_Tab 5mg"
        },
        {
            "name": "Lisinopril_Tab 10mg"
        },
        {
            "name": "Lisinopril_Tab 20mg"
        },
        {
            "name": "Perindopril Erbumine_Tab 2mg"
        },
        {
            "name": "Perindopril Erbumine_Tab 4mg"
        },
        {
            "name": "Perindopril Erbumine_Tab 8mg"
        },
        {
            "name": "Ramipril_Cap 1.25mg"
        },
        {
            "name": "Ramipril_Cap 2.5mg"
        },
        {
            "name": "Ramipril_Cap 5mg"
        },
        {
            "name": "Ramipril_Cap 10mg"
        },
        {
            "name": "Ramipril_Tab 2.5mg"
        },
        {
            "name": "Ramipril_Tab 10mg"
        },
        {
            "name": "Perindopril Arginine_Tab 2.5mg"
        },
        {
            "name": "Clonidine HCl_Tab 25mcg"
        },
        {
            "name": "Perindopril Argin/Indapam_Tab 5mg/1.25mg"
        },
        {
            "name": "Irbesartan/Hydchloroth_Tab 150mg/12.5mg"
        },
        {
            "name": "Irbesartan/Hydchloroth_Tab 300mg/12.5mg"
        },
        {
            "name": "Irbesartan/Hydchloroth_Tab 300mg/25mg"
        },
        {
            "name": "CoAprovel_Tab 150mg/12.5mg"
        },
        {
            "name": "Olmesartan Medoxomil_Tab 10mg"
        },
        {
            "name": "Olmesartan Medoxomil_Tab 20mg"
        },
        {
            "name": "Olmesartan Medoxomil_Tab 40mg"
        },
        {
            "name": "Candesartan Cilexetil_Tab 4mg"
        },
        {
            "name": "Candesartan Cilexetil_Tab 8mg"
        },
        {
            "name": "Candesartan Cilexetil_Tab 16mg"
        },
        {
            "name": "Irbesartan_Tab 75mg"
        },
        {
            "name": "Irbesartan_Tab 150mg"
        },
        {
            "name": "Irbesartan_Tab 300mg"
        },
        {
            "name": "Losartan Pot_Tab 25mg"
        },
        {
            "name": "Losartan Pot_Tab 50mg"
        },
        {
            "name": "Losartan Pot_Tab 100mg"
        },
        {
            "name": "Losartan Pot/Hydchloroth_Tab 50mg/12.5mg"
        },
        {
            "name": "Losartan Pot/Hydchloroth_Tab 100/12.5mg"
        },
        {
            "name": "Telmisartan_Tab 20mg"
        },
        {
            "name": "Valsartan_Cap 80mg"
        },
        {
            "name": "Valsartan_Cap 160mg"
        },
        {
            "name": "Valsartan/Hydchloroth_Tab 80mg/12.5mg"
        },
        {
            "name": "Olmesartan Medox/Hydchloroth_Tab 20/12.5"
        },
        {
            "name": "Aliskiren_Tab 150mg"
        },
        {
            "name": "Aliskiren_Tab 300mg"
        },
        {
            "name": "Glyceryl Trinit_Tab 500mcg"
        },
        {
            "name": "Glyceryl Trinit_Tab Buccal 2mg M/R S/F"
        },
        {
            "name": "Glyceryl Trinit_Tab Buccal 3mg M/R S/F"
        },
        {
            "name": "Glyceryl Trinit_Tab 300mcg"
        },
        {
            "name": "Glyceryl Trinit_Sub A/Spy 400mcg (180D)"
        },
        {
            "name": "Glyceryl Trinit_Sub P/Spy 400mcg (180D)"
        },
        {
            "name": "Glyceryl Trinit_Sub P/Spy 400mcg (200D)"
        },
        {
            "name": "Isosorbide Dinit_Tab 20mg M/R"
        },
        {
            "name": "Isosorbide Mononit_Tab 10mg"
        },
        {
            "name": "Isosorbide Mononit_Tab 20mg"
        },
        {
            "name": "Isosorbide Mononit_Tab 40mg"
        },
        {
            "name": "Imdur_Durule 60mg"
        },
        {
            "name": "Monomax XL_Tab 60mg"
        },
        {
            "name": "Amlodipine_Tab 5mg"
        },
        {
            "name": "Amlodipine_Tab 10mg"
        },
        {
            "name": "Amlodipine_Oral Soln 10mg/5ml"
        },
        {
            "name": "Istin_Tab 5mg"
        },
        {
            "name": "Istin_Tab 10mg"
        },
        {
            "name": "Diltiazem HCl_Tab 60mg M/R"
        },
        {
            "name": "Diltiazem HCl_Tab 120mg M/R"
        },
        {
            "name": "Diltiazem HCl_Cap 90mg M/R"
        },
        {
            "name": "Diltiazem HCl_Cap 120mg M/R"
        },
        {
            "name": "Diltiazem HCl_Cap 180mg M/R"
        },
        {
            "name": "Diltiazem HCl_Cap 360mg M/R"
        },
        {
            "name": "Tildiem Ret 90_Tab 90mg"
        },
        {
            "name": "Tildiem LA 300_Cap 300mg"
        },
        {
            "name": "Tildiem LA 200_Cap 200mg"
        },
        {
            "name": "Adizem-XL_Cap 120mg"
        },
        {
            "name": "Adizem-XL_Cap 180mg"
        },
        {
            "name": "Adizem-XL_Cap 240mg"
        },
        {
            "name": "Dilzem SR 60_Cap 60mg"
        },
        {
            "name": "Dilzem SR 90_Cap 90mg"
        },
        {
            "name": "Dilzem XL 120_Cap 120mg"
        },
        {
            "name": "Dilzem XL 180_Cap 180mg"
        },
        {
            "name": "Dilzem XL 240_Cap 240mg"
        },
        {
            "name": "Angitil SR 90_Cap 90mg"
        },
        {
            "name": "Angitil SR 120_Cap 120mg"
        },
        {
            "name": "Angitil SR 180_Cap 180mg"
        },
        {
            "name": "Angitil XL 240_Cap 240mg"
        },
        {
            "name": "Angitil XL 300_Cap 300mg"
        },
        {
            "name": "Zemtard 300 XL_Cap 300mg"
        },
        {
            "name": "Zemtard 120 XL_Cap 120mg"
        },
        {
            "name": "Zemtard 180 XL_Cap 180mg"
        },
        {
            "name": "Zemtard 240 XL_Cap 240mg"
        },
        {
            "name": "Viazem XL_Cap 120mg"
        },
        {
            "name": "Viazem XL_Cap 180mg"
        },
        {
            "name": "Viazem XL_Cap 240mg"
        },
        {
            "name": "Viazem XL_Cap 360mg"
        },
        {
            "name": "Felodipine_Tab 10mg M/R"
        },
        {
            "name": "Felodipine_Tab 2.5mg M/R"
        },
        {
            "name": "Cardioplen XL_Tab 5mg"
        },
        {
            "name": "Lercanidipine HCl_Tab 10mg"
        },
        {
            "name": "Lercanidipine HCl_Tab 20mg"
        },
        {
            "name": "Nicardipine HCl_Cap 20mg"
        },
        {
            "name": "Nifedipine_Cap 5mg"
        },
        {
            "name": "Nifedipine_Cap 10mg"
        },
        {
            "name": "Nifedipine_Cap 20mg M/R"
        },
        {
            "name": "Nifedipine_Cap 10mg M/R"
        },
        {
            "name": "Nifedipine_Tab 60mg M/R"
        },
        {
            "name": "Nifedipine_Cap 30mg M/R"
        },
        {
            "name": "Adalat LA 60_Tab 60mg"
        },
        {
            "name": "Adalat LA 20_Tab 20mg"
        },
        {
            "name": "Coracten SR_Cap 10mg"
        },
        {
            "name": "Coracten XL_Cap 30mg"
        },
        {
            "name": "Coracten XL_Cap 60mg"
        },
        {
            "name": "Adipine MR 20_Tab 20mg"
        },
        {
            "name": "Adipine MR 10_Tab 10mg"
        },
        {
            "name": "Adipine XL_Tab 30mg"
        },
        {
            "name": "Adipine XL_Tab 60mg"
        },
        {
            "name": "Verapamil HCl_Tab 40mg"
        },
        {
            "name": "Verapamil HCl_Tab 80mg"
        },
        {
            "name": "Verapamil HCl_Tab 240mg M/R"
        },
        {
            "name": "Verapamil HCl_Tab 120mg M/R"
        },
        {
            "name": "Securon Sr_Tab 240mg"
        },
        {
            "name": "Vertab SR 240_Tab 240mg"
        },
        {
            "name": "Nicorandil_Tab 10mg"
        },
        {
            "name": "Nicorandil_Tab 20mg"
        },
        {
            "name": "Ivabradine_Tab 5mg"
        },
        {
            "name": "Ranolazine_Tab 500mg M/R"
        },
        {
            "name": "Naftidrofuryl Oxal_Cap 100mg"
        },
        {
            "name": "Pentoxifylline_Tab 400mg M/R"
        },
        {
            "name": "Cilostazol_Tab 100mg"
        },
        {
            "name": "Enoxaparin_Inj 100mg/ml 0.4ml Pfs"
        },
        {
            "name": "Tinzaparin Sod_Inj 20 000u/ml 0.7ml Pfs"
        },
        {
            "name": "Tinzaparin Sod_Inj 20 000u/ml 0.9ml Pfs"
        },
        {
            "name": "Tinzaparin Sod_Inj 20 000u/ml 0.5ml Pfs"
        },
        {
            "name": "Tinzaparin Sod_Inj 10 000u/ml 0.35ml Pfs"
        },
        {
            "name": "Tinzaparin Sod_Inj 10 000u/ml 0.25ml Pfs"
        },
        {
            "name": "Innohep_Inj 20 000u/ml 0.7ml Pfs"
        },
        {
            "name": "Warfarin Sod_Tab 1mg"
        },
        {
            "name": "Warfarin Sod_Tab 3mg"
        },
        {
            "name": "Warfarin Sod_Tab 5mg"
        },
        {
            "name": "Dabigatran Etexilate_Cap 75mg"
        },
        {
            "name": "Dabigatran Etexilate_Cap 150mg"
        },
        {
            "name": "Aspirin Disper_Tab 75mg"
        },
        {
            "name": "Aspirin_Tab 75mg"
        },
        {
            "name": "Aspirin_Tab E/C 75mg"
        },
        {
            "name": "Nu-Seals 75_Tab E/C 75mg"
        },
        {
            "name": "Clopidogrel_Tab 75mg"
        },
        {
            "name": "Dipyridamole_Tab 100mg"
        },
        {
            "name": "Dipyridamole_Cap 200mg M/R"
        },
        {
            "name": "Prasugrel_Tab 10mg"
        },
        {
            "name": "Tranexamic Acid_Tab 500mg"
        },
        {
            "name": "Tranexamic Acid_Liq Spec 500mg/5ml"
        },
        {
            "name": "Rosuvastatin Calc_Tab 10mg"
        },
        {
            "name": "Rosuvastatin Calc_Tab 20mg"
        },
        {
            "name": "Rosuvastatin Calc_Tab 40mg"
        },
        {
            "name": "Rosuvastatin Calc_Tab 5mg"
        },
        {
            "name": "EPA/DHA_Cap 460mg/380mg"
        },
        {
            "name": "Simvastatin/Ezetimibe_Tab 20mg/10mg"
        },
        {
            "name": "Simvastatin/Ezetimibe_Tab 40mg/10mg"
        },
        {
            "name": "Simvastatin/Ezetimibe_Tab 80mg/10mg"
        },
        {
            "name": "Colesevelam HCl_Tab 625mg"
        },
        {
            "name": "Atorvastatin_Tab 10mg"
        },
        {
            "name": "Atorvastatin_Tab 20mg"
        },
        {
            "name": "Atorvastatin_Tab 40mg"
        },
        {
            "name": "Atorvastatin_Tab 80mg"
        },
        {
            "name": "Bezafibrate_Tab 200mg"
        },
        {
            "name": "Bezafibrate_Tab 400mg M/R"
        },
        {
            "name": "Questran Light_Sach 9g (4g Of Ingredient"
        },
        {
            "name": "Ezetimibe_Tab 10mg"
        },
        {
            "name": "Fluvastatin Sod_Cap 40mg"
        },
        {
            "name": "Fenofibrate_Cap 200mg (Micronised)"
        },
        {
            "name": "Fenofibrate_Cap 67mg (Micronised)"
        },
        {
            "name": "Fenofibrate_Cap 267mg (Micronised)"
        },
        {
            "name": "Fenofibrate_Tab 160mg (Micronised)"
        },
        {
            "name": "Maxepa_Cap 1g"
        },
        {
            "name": "Pravastatin Sod_Tab 10mg"
        },
        {
            "name": "Pravastatin Sod_Tab 20mg"
        },
        {
            "name": "Pravastatin Sod_Tab 40mg"
        },
        {
            "name": "Simvastatin_Tab 10mg"
        },
        {
            "name": "Simvastatin_Tab 20mg"
        },
        {
            "name": "Simvastatin_Tab 40mg"
        },
        {
            "name": "Simvastatin_Tab 80mg"
        },
        {
            "name": "Simvastatin_Oral Susp 20mg/5ml S/F"
        },
        {
            "name": "Simvastatin_Oral Susp 40mg/5ml S/F"
        },
        {
            "name": "Zocor_Tab 40mg"
        },
        {
            "name": "Bambuterol HCl_Tab 10mg"
        },
        {
            "name": "Formoterol Fumar_Pdr For Inh 6mcg (60 D)"
        },
        {
            "name": "Salbutamol_Pdr For Inh 95mcg (200 D)"
        },
        {
            "name": "Salbutamol_Inha 100mcg (200 D) CFF"
        },
        {
            "name": "Salbutamol_Pdr For Inh 200mcg (60 D)"
        },
        {
            "name": "Salbutamol_Inh Soln 2.5mg/2.5ml Ud"
        },
        {
            "name": "Salbutamol_Inh Soln 5mg/ml"
        },
        {
            "name": "Salbutamol_Oral Soln 2mg/5ml S/F"
        },
        {
            "name": "Salbutamol_Inha B/A 100mcg (200 D) CFF"
        },
        {
            "name": "Ventolin_Accuhaler 200mcg (60 D)"
        },
        {
            "name": "Ventolin_Evohaler 100mcg (200 D)"
        },
        {
            "name": "Salamol_Steri-Neb Soln 2.5mg/2.5ml Ud"
        },
        {
            "name": "Salamol_Steri-Neb Soln 5mg/2.5ml Ud"
        },
        {
            "name": "Salamol E-Breathe_Inh 100mcg (200 D) CFF"
        },
        {
            "name": "Salmeterol_Pdr For Inh 50mcg + Ref"
        },
        {
            "name": "Salmeterol_Pdr For Inh 50mcg (60 D)"
        },
        {
            "name": "Salmeterol_Inha 25mcg (120 D) CFF"
        },
        {
            "name": "Terbut Sulph_B/A Inha 500mcg (100 D)"
        },
        {
            "name": "Bricanyl_Turbohaler 500mcg (100 D)"
        },
        {
            "name": "Ipratrop Brom_Inha 20mcg (200 D) CFF"
        },
        {
            "name": "Ipratrop_Steri-Neb Soln 250mcg/1ml Ud"
        },
        {
            "name": "Ipratrop_Steri-Neb Soln 500mcg/2ml Ud"
        },
        {
            "name": "Tiotropium_Pdr For Inh Cap 18mcg + Dev"
        },
        {
            "name": "Tiotropium_Pdr For Inh Cap 18mcg"
        },
        {
            "name": "Spiriva Respimat_Inha 2.5mcg (60D)+ Dev"
        },
        {
            "name": "Phyllocontin Continus_Tab 225mg"
        },
        {
            "name": "Theophylline_Tab 200mg M/R"
        },
        {
            "name": "Slo-Phyllin_Cap 60mg"
        },
        {
            "name": "Slo-Phyllin_Cap 125mg"
        },
        {
            "name": "Slo-Phyllin_Cap 250mg"
        },
        {
            "name": "Uniphyllin Continus_Tab 400mg"
        },
        {
            "name": "Uniphyllin Continus_Tab 200mg"
        },
        {
            "name": "Uniphyllin Continus_Tab 300mg"
        },
        {
            "name": "Gppe Inh Soln_Combivent Ud 2.5ml"
        },
        {
            "name": "Beclomet Diprop_Inha B/A100mcg(200 D)CFF"
        },
        {
            "name": "Beclomet Diprop/Formoterol_Inh100/6(120D"
        },
        {
            "name": "Qvar 50_Inha 50mcg (200 D)"
        },
        {
            "name": "Qvar 100_Inha 100mcg (200 D)"
        },
        {
            "name": "Qvar 50 E-Breathe_Inha 50mcg (200 D)"
        },
        {
            "name": "Qvar 100 E-Breathe_Inha 100mcg (200 D)"
        },
        {
            "name": "Clenil Modulite_Inha 50mcg (200D)"
        },
        {
            "name": "Clenil Modulite_Inha 100mcg (200D)"
        },
        {
            "name": "Clenil Modulite_Inha 200mcg (200D)"
        },
        {
            "name": "Fostair_Inh 100mcg/6mcg (120D) CFF"
        },
        {
            "name": "Budesonide_Pdr For Inh 400mcg (50 D)"
        },
        {
            "name": "Budesonide/Formoterol Inh B/A 100/6(120D"
        },
        {
            "name": "Budesonide/Formoterol Inh B/A 200/6(120D"
        },
        {
            "name": "Budesonide/Formoterol Inh B/A 400/12(60D"
        },
        {
            "name": "Pulmicort_Turbohaler 200mcg (100 D)"
        },
        {
            "name": "Symbicort_Turbohaler 200mcg/6mcg (120 D)"
        },
        {
            "name": "Symbicort_Turbohaler 400mcg/12mcg (60 D)"
        },
        {
            "name": "Fluticasone Prop_Pdr For Inh 100mcg(60D)"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 100/50mcg 60D"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 250/50mcg 60D"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 500/50mcg 60D"
        },
        {
            "name": "Fluticasone Prop_Inha 250mcg (120 D) CFF"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 50/25mcg 120D"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 125/25mcg120D"
        },
        {
            "name": "Fluticasone/Salmeterol_Inh 250/25mcg120D"
        },
        {
            "name": "Seretide 100_Accuhaler 100mcg/50mcg(60D)"
        },
        {
            "name": "Seretide 250_Accuhaler 250mcg/50mcg(60D)"
        },
        {
            "name": "Seretide 500_Accuhaler 500mcg/50mcg(60D)"
        },
        {
            "name": "Seretide 50_Evohaler 50mcg/25mcg (120 D)"
        },
        {
            "name": "Seretide 250_Evohaler 250mcg/25mcg(120D)"
        },
        {
            "name": "Ciclesonide_Inh 160mcg (60 D) CFF"
        },
        {
            "name": "Montelukast_Tab Chble 5mg S/F"
        },
        {
            "name": "Montelukast_Tab 10mg"
        },
        {
            "name": "Montelukast_Tab Chble 4mg S/F"
        },
        {
            "name": "Mizolastine_Tab 10mg M/R"
        },
        {
            "name": "Desloratadine_Tab 5mg"
        },
        {
            "name": "Levocetirizine_Tab 5mg"
        },
        {
            "name": "Loratadine_Tab 10mg"
        },
        {
            "name": "Loratadine_Oral Soln 5mg/5ml"
        },
        {
            "name": "Fexofenadine HCl_Tab 120mg"
        },
        {
            "name": "Fexofenadine HCl_Tab 180mg"
        },
        {
            "name": "Fexofenadine HCl_Tab 30mg"
        },
        {
            "name": "Chlorphenamine Mal_Oral Soln 2mg/5ml"
        },
        {
            "name": "Chlorphenamine Mal_Tab 4mg"
        },
        {
            "name": "Cetirizine HCl_Tab 10mg"
        },
        {
            "name": "Cetirizine HCl_Oral Soln 1mg/1ml S/F"
        },
        {
            "name": "Hydroxyzine HCl_Tab 10mg"
        },
        {
            "name": "Hydroxyzine HCl_Tab 25mg"
        },
        {
            "name": "Cyproheptadine HCl_Tab 4mg"
        },
        {
            "name": "Diphenhydramine HCl_Tab 25mg"
        },
        {
            "name": "Diphenhydramine HCl_Tab 50mg"
        },
        {
            "name": "Promethazine HCl_Tab 10mg"
        },
        {
            "name": "Promethazine HCl_Tab 25mg"
        },
        {
            "name": "Alimemazine Tart_Tab 10mg"
        },
        {
            "name": "Epipen_Auto-Inj 1/1000 1mg/ml 0.3ml"
        },
        {
            "name": "Acetylcy_Tab Eff 600mg"
        },
        {
            "name": "Carbocisteine_Cap 375mg"
        },
        {
            "name": "Carbocisteine_Oral Soln 250mg/5ml"
        },
        {
            "name": "Codeine Phos_Linct 15mg/5ml"
        },
        {
            "name": "Codeine Phos_Linct 15mg/5ml S/F"
        },
        {
            "name": "Pholcodine_Linct 5mg/5ml S/F"
        },
        {
            "name": "Simple_Linct"
        },
        {
            "name": "Simple_Linct Paed"
        },
        {
            "name": "Simple_Linct S/F"
        },
        {
            "name": "Haymine_Tab"
        },
        {
            "name": "Pseudoephed HCl_Oral Soln 30mg/5ml"
        },
        {
            "name": "Pseudoephed HCl_Tab 60mg"
        },
        {
            "name": "Galpseud_Tab 60mg"
        },
        {
            "name": "Melatonin_Tab 2mg M/R"
        },
        {
            "name": "Melatonin_Cap 3mg M/R"
        },
        {
            "name": "Melatonin_Oral Soln 5mg/5ml"
        },
        {
            "name": "Circadin_Tab 2mg M/R"
        },
        {
            "name": "Cloral Betaine_Tab 707mg"
        },
        {
            "name": "Clomethi_Cap 192mg"
        },
        {
            "name": "Nitrazepam_Tab 5mg"
        },
        {
            "name": "Temazepam_Tab 10mg"
        },
        {
            "name": "Temazepam_Tab 20mg"
        },
        {
            "name": "Zolpidem Tart_Tab 10mg"
        },
        {
            "name": "Zopiclone_Tab 7.5mg"
        },
        {
            "name": "Zopiclone_Tab 3.75mg"
        },
        {
            "name": "Buspirone HCl_Tab 5mg"
        },
        {
            "name": "Buspirone HCl_Tab 10mg"
        }
    ]

export default drugNames;
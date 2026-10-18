# LeonTech Forge — Chuo binafsi cha udereva, toleo 2

## Kufungua
- **Mtandaoni (simu na kompyuta):** https://leonardmugendi.github.io/leontech-academy/ — fungua kwa Chrome, kisha kwenye simu chagua "Add to Home screen". Baada ya kufunguliwa mara ya kwanza, mfumo unafanya kazi hata bila intaneti.
- **Kwenye kompyuta bila mtandao:** fungua `index.html` kwa Chrome au Edge. Hifadhi folder nzima pamoja; usihamishe index.html peke yake.

## Kilichomo
- Masomo 58 katika moduli 14, yenye picha halisi ya mfano, mchoro wa hatua, makosa ya kuepuka, vigezo vya tathmini na kitufe cha "Sikiliza somo".
- Utafutaji wa masomo kwenye Mtaala.
- Vielelezo 220 vya alama na michoro ardhini kutoka A Guide to Traffic Signing (Tanzania, 2009), pamoja na kurasa zote 42 za mwongozo kama picha zinazosomeka kwenye simu.
- Maswali 104 ya nadharia, majaribio ya kutambua alama, mtihani wa majaribio (maswali 30, dakika 30) na "Rudia makosa yangu".
- Taa shirikishi na hali 6 za maamuzi.
- Mpango wa eneo lililotengwa, Tabata Kisukuru, njia ya km 8 na barabara kubwa, kila hatua ikiwa na picha zako mwenyewe.
- Tathmini za mwalimu, historia ya mazoezi na grafu ya kujiamini kabla/baada ya kila kipindi.
- Kusawazisha simu na kompyuta kupitia repo ya siri ya GitHub; backup JSON (na au bila picha); uchapishaji; mwanga/giza.

## Mwalimu na mwanafunzi
Mfumo unafunguka kama **mwanafunzi**: masomo, alama, mazoezi, majaribio na "Maendeleo yangu". Kitufe cha **🔒 Mwalimu** juu kinafungua hali ya mwalimu kwa PIN (tarakimu 4–8), na kuongeza Tathmini ya vitendo, Ripoti ya mwalimu na Mipangilio na backup. Mara ya kwanza, PIN inawekwa na yeyote anayebonyeza kitufe hicho, kwa hiyo mwalimu aiweke mapema. PIN inasawazishwa kwenye vifaa vyote. Umesahau PIN? Bonyeza "Umesahau PIN?" na uthibitishe kwa token ya GitHub ya kifaa hicho. Mfumo hauna server, hivyo PIN ni kizuizi cha kawaida, si ulinzi kamili.

Ripoti inaonyesha masomo yaliyosomwa (tarehe na mara yaliyofunguliwa), kila jaribio la maswali (majibu aliyochagua na sahihi), maswali yanayokosewa mara nyingi, vipindi vya mazoezi, mambo ya kurudia na utayari. Inachujwa kwa siku 7, 30 au zote, na inachapishwa au kuhifadhiwa kama PDF.

## Kusawazisha simu na kompyuta
Maendeleo na picha zako zinahifadhiwa kwenye repo ya **siri** `leontech-data`, si kwenye repo ya umma ya mfumo.
1. Tengeneza token: GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token. Repository access: **Only select repositories → leontech-data**. Permissions → Repository → **Contents: Read and write**. Weka muda wa kuisha (mfano mwaka 1).
2. Kwenye mfumo (ukiwa umeingia kama mwalimu): Mipangilio na backup → "Sawazisha kupitia GitHub" → weka token → "Hifadhi na sawazisha". Rudia kwenye kila kifaa.
3. Baada ya hapo mfumo unasawazisha wenyewe unapoufungua na sekunde chache baada ya mabadiliko. Ukiwa offline, utasawazisha ukirudi mtandaoni.

Token inabaki kwenye kifaa husika tu na haiingii kwenye backup. Ukipoteza simu, futa token hiyo kwenye GitHub na utengeneze nyingine. Vifaa viwili vikibadilisha kitu kilekile bila kusawazisha katikati, toleo jipya zaidi linashinda; vipindi vya mazoezi, majaribio na masomo yaliyosomwa huunganishwa kutoka pande zote.

## Kuhamisha maendeleo ya zamani
1. Fungua mfumo wa zamani katika browser ile uliyotumia.
2. Fungua Progress na Backup, kisha Export Backup.
3. Fungua toleo hili, ingia kama mwalimu; nenda Mipangilio na backup.
4. Chagua faili kwenye Rejesha backup, kisha thibitisha.
5. Kagua taarifa. Ufaulu wa zamani ubaki historia; mwalimu athibitishe vigezo vya masomo mapya.

Browser inaweza kutenganisha hifadhi kwa kila njia ya faili au tovuti. Nakala ya taarifa za zamani inahifadhiwa pia kama legacyArchive ndani ya backup mpya. Hifadhi ya ndani inaweza kufutwa na browser; tumia kusawazisha au pakua backup mara kwa mara. JSON ina majina, maoni na (ukichagua) picha zako, hivyo ihifadhi sehemu yako binafsi.

## Picha na chanzo
Picha ya ukurasa wa Mwanzo ni ya TTTNIS, Wikimedia Commons, public domain; si gari T733DCG. Ukiweka picha ya gari lako kwenye Maendeleo, itaonekana badala yake. Kila somo lina picha halisi ya mfano kutoka Wikimedia Commons (`assets/photos/lessons`; wapiga picha na leseni ziko kwenye ukurasa wa Marejeo na `assets/photos.js`). Nyingi zimepigwa Dar es Salaam (Ubungo, Sinza, Mbweni, Kawawa Road) na Dodoma, lakini si za njia yako.

Alama zimetolewa katika mwongozo wa 2009 wa tovuti ya Wizara ya Ujenzi; si madai ya orodha ya kila alama katika kila kiwango au sheria ya sasa. Mwalimu mwenye sifa athibitishe matumizi halisi na utayari wa mwanafunzi. Mtihani wa majaribio si mtihani rasmi wa leseni.

## Kwa matengenezo
Zana inahitaji Node.js pekee; mtumiaji wa mafunzo haihitaji.
- `node tools/data.js export` — inaandika `tools/academy.json` (masomo, moduli na alama) ili uhariri.
- `node tools/data.js build` — inakagua academy.json na kuandika upya `assets/data.js`.
- `node tools/data.js check` — inakagua data.js, picha za kila somo (`assets/photos.js`) na maswali ya ziada (`assets/questions.js`).
- `node tools/data.js sw` — inaandika upya `sw.js` (mafaili ya offline na toleo jipya la cache).

Maswali mapya ya nadharia yanaongezwa kwenye `assets/questions.js`. Ukibadilisha au kuongeza faili lolote, endesha `node tools/data.js sw` kabla ya kupush, ili simu zipakue toleo jipya.

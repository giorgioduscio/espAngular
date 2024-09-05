export function randomId():number{ return Math.floor(Math.random() *100000000000) }

export function randomImage():string{
  switch(Math.floor(Math.random() *(15 -0) +0)){ // 0/15
    case 15: return "https://img.freepik.com/vettori-gratuito/silhouette-di-serpente-disegnato-a-mano-con-sfondo-di-fiori_23-2148121387.jpg?t=st=1722935629~exp=1722939229~hmac=8dd09f9e42a856a6ca3db23bb2d4139fa37f551990b315be594062e66ff5c9d9&w=826" 
    case 14: return "https://img.freepik.com/vettori-gratuito/illustrazione-del-teschio-di-dinosauro-con-bolla-di-testo-tyrannosaur-rex-stampa-t-shirt_1284-38745.jpg?t=st=1722935567~exp=1722939167~hmac=bdda1df1fb5686d4fcf349f62d8c6311460909711114fcac3f2c39527b3ae0d2&w=826" 
    case 13: return "https://img.freepik.com/foto-premium/rete-di-ragni-striscianti-design-piatto-illustrazione-arte-kawaii_1297700-313.jpg?w=826" 
    case 12: return "https://img.freepik.com/foto-gratuito/boatman-punting-la-barca-al-fiume-arashiyama-nella-stagione-autunnale-lungo-il-fiume-a-kyoto-in-giappone_335224-56.jpg?t=st=1722935204~exp=1722938804~hmac=7fa18afcbbb5fdcf1849cb6f7d80156e9050c9eaf6e6c927b4c219cb1c56498c&w=1380" 
    case 11: return "https://img.freepik.com/vettori-gratuito/sfondo-del-campo-di-fiori-sfumati_52683-121834.jpg?t=st=1722935157~exp=1722938757~hmac=6fc545b543197b8941129623fa1c086526883372ad257e5e098e50a5c41ddd37&w=1380" 
    case 10: return "https://img.freepik.com/foto-premium/bel-posto-per-sedersi-con-una-bella-vista-sul-tramonto-169_1309778-11892.jpg?w=826" 
    case 9: return "https://img.freepik.com/foto-gratuito/balena-fantastica-nel-cielo_23-2151445943.jpg?t=st=1722064295~exp=1722067895~hmac=f5928bc9a0f9e1297129d228c99e921892020de8e6f33b2a38b8c2155234d0cf&w=740"
    case 8: return "https://img.freepik.com/foto-gratuito/bellissimo-pesce-pagliaccio-sottomarino_23-2150737801.jpg?ga=GA1.1.333837650.1710254848&semt=ais_user"
    case 7: return "https://img.freepik.com/foto-gratuito/rendering-3d-del-coniglietto-di-pasqua-vestito_23-2151258315.jpg?t=st=1722064438~exp=1722068038~hmac=32963cc5ad56e6a6e8fe7ecb28ba1ec8a0c78b4da1f57a158be29b2a1522ca1f&w=1380"
    case 6: return "https://img.freepik.com/foto-gratuito/squirrello-realistico-in-un-ambiente-naturale_23-2151459488.jpg?t=st=1722064493~exp=1722068093~hmac=86afe7f73c0c1759e72511be2e32bea12662335614ebdb53d9368e4fa5628b3b&w=1380"
    case 5: return "https://img.freepik.com/foto-gratuito/colpo-del-primo-piano-di-un-mandrillo-solo-su-uno-sfocato_181624-7176.jpg?t=st=1722064611~exp=1722068211~hmac=22ffc9ea45ae457d6595f249e868d33362666bdc46c1f0a20bc24aaa9564607e&w=1380"
    case 4: return "https://img.freepik.com/foto-premium/una-foto-e-un-must-per-il-lavoro-quotidiano-generata-da-ai-miglior-foto-meravigliosa_1089043-78495.jpg?w=1380"
    case 3: return "https://img.freepik.com/foto-gratuito/istrice-europeo-sulle-mani-nell-habitat-naturale-del-giardino_1150-18214.jpg?t=st=1722063972~exp=1722067572~hmac=1e1630ae8f62810a2f1ecf491b9a8b8e72608a954dbd6991a233cc3f983dc289&w=1380" 
    case 2: return "https://img.freepik.com/foto-premium/un-gruppo-di-lemuri-cattas-in-natura_946696-3416.jpg?w=1380" 
    case 1: return "https://img.freepik.com/foto-premium/ritratto-ravvicinato-di-racoon_1037680-36274.jpg?w=826" 
    default: return "https://img.freepik.com/vettori-premium/gruppo-di-raggi-del-mare-che-nuotano-sull-oceano-vettore_689711-63.jpg?w=826"
  }
}

export function randomString() :string {
  const 
    repetitions =Math.floor(Math.random() *(10 -4) +4),
    consonants =['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
    vowels =['a', 'e', 'i', 'o', 'u'],
    result :string[] =[]
    // repetitions =Math.random() * (max - min) + min;

  for (let index = 0; index < repetitions; index++) {
    // array da esaminare
    const letters =(result.length%2==0 ||result.length==5) ?consonants :vowels 
    // indice casuale
    const randomIndex =Math.floor(Math.random() *(letters.length -0) +0)
    // scrivere lettera
    result.push(letters[randomIndex])
  }
  return result.join('') 
}
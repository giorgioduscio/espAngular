import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL ="https://jsonplaceholder.typicode.com/users"
  constructor(private http: HttpClient) {}
  getUsers(){return this.http.get <any[]> (this.usersURL)}


  private users :User[] =[
    {
      id: selectId(),
      username: 'procioneSupremo',
      email: 'procioneSupremo@gmail',
      role: 'admin',
      imageUrl: selectImage(),
    },
    {
      id: selectId(),
      username: 'riccioCurioso',
      email: 'riccioCurioso@gmail',
      role: 'writer',
      imageUrl: selectImage(),
    },
    {
      id: selectId(),
      username: 'lemurePuzzolente',
      email: 'lemurePuzzolente@gmail',
      role: 'writer',
      imageUrl: selectImage(),
    },
  ]
  getUsers__(){return this.users}
  addUser(body:any){this.users.push(body)}
}

function selectId(){return Math.floor(Math.random() *100)}
function selectImage(){
  let random =Math.floor(Math.random() *10) +1 // 1/10
  switch(random){
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
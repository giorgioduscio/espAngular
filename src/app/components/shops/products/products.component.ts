import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  id :number =1
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id =Number(params['id'])
      console.log('router:id', this.id);
      
    });

  }

  ngOnInit() {
  }
}

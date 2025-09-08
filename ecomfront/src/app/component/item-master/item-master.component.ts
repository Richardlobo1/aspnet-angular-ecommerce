import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../Model/product';
import { ProductService } from '../../Services/product.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-item-master',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './item-master.component.html',
  styleUrl: './item-master.component.css',
})
export class ItemMasterComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  productform: FormGroup = new FormGroup({});
  formValue: any;
  constructor(private fb: FormBuilder) {}
  ProductList: Product[] = [];
  ProdService = inject(ProductService);
  ngOnInit(): void {
    this.setFormState();
    this.getProduct();
  }
  openModal() {
    const prodModal = document.getElementById('myModal');
    if (prodModal != null) {
      prodModal.style.display = 'block';
    }
  }
  closeModal() {
    this.setFormState();
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
    // const prodModal = document.getElementById('myModal');
    // if (prodModal != null) {
    //   prodModal.style.display = 'none';
    // }
  }
  setFormState() {
    this.productform = this.fb.group({
      id: [0],
      productName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  // onSubmit(){
  //   if(this.productform.value){
  //     if(this.productform.invalid){
  //       alert("Please fill all record");
  //       return ;
  //     }else{
  //       this.formValue=this.productform.value;
  //       this.ProdService.addProduct(this.formValue).subscribe((res)=>{
  //         alert("Product Add Succesfull");
  //         this.productform.reset();
  //         this.getProduct();
  //       })
  //       this.closeModal();
  //     }

  //   }

  // }
  onSubmit() {
    if (this.productform.invalid) {
      alert('Please fill all record');
      return;
    }

    this.formValue = this.productform.value;

    if (this.formValue.id === 0) {
      // Add
      this.ProdService.addProduct(this.formValue).subscribe((res) => {
        alert('Product added successfully');
        this.getProduct();
        this.closeModal();
      });
    } else {
      // Update
      this.ProdService.updateProduct(this.formValue).subscribe((res) => {
        alert('Product updated successfully');
        this.getProduct();
        this.closeModal();
      });
    }
  }

  getProduct() {
    this.ProdService.getAllProduct().subscribe((res) => {
      this.ProductList = res;
    });
  }
  onEdit(product: Product) {
    this.openModal();
    this.productform.patchValue(product);
  }
  onDelete(id: number) {
    const isConfirm = confirm('Are You Sure want to delete ?');
    if (isConfirm) {
      this.ProdService.deleteProduct(id).subscribe((res) => {
        alert('Product Delete Successfully');
        this.getProduct();
      });
    } else {
      ('You select No option.');
    }
  }
}

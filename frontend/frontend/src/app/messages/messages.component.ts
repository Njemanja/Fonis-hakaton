import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Poruka } from '../models/poruka1';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Poruke } from '../models/poruka';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent {
    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
    poruke: Poruke[] = []
    dataNew: any = {};
    id: number;
    korisnickoIme: string;
    prikazi: [];
    nizOtvorenih: number[];
    ngOnInit() {
        this.nizOtvorenih = JSON.parse(localStorage.getItem("nizOtvorenih"))
        if (!this.nizOtvorenih) {
            this.nizOtvorenih = [];
        }
        this.korisnickoIme = JSON.parse(localStorage.getItem("token")).username;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.userService.poruke1(this.korisnickoIme).subscribe((data: Poruke[]) => {
            this.poruke = data;

            this.poruke.sort((a, b) => {
                if (a.poruke[a.poruke.length - 1].datum < b.poruke[b.poruke.length - 1].datum) {
                    return 1;
                }
                if (a.poruke[a.poruke.length - 1].datum > b.poruke[b.poruke.length - 1].datum) {
                    return -1;
                }
                return 0;
            });
            localStorage.setItem("broj", JSON.stringify(this.poruke.length))
        })

    }


    posaljiPoruku(i, k1, k2) {
        let nova = new Poruka();
        nova.datum = new Date();
        nova.from = this.korisnickoIme;
        nova.poruka = this.dataNew[i];
        if (k1 == this.korisnickoIme) {
            k1 = k2;
        }
        this.userService.posaljiPoruku(nova, this.korisnickoIme, k1).subscribe((resp) => {
            let poruka = resp['poruka']
            alert("Poruka poslata!");

        })
        this.router.navigate(['/messages']);

    }
    zatvori(id) {
        this.nizOtvorenih = this.nizOtvorenih.filter((item) => item !== id);
        localStorage.setItem("nizOtvorenih", JSON.stringify(this.nizOtvorenih))
        let div = document.getElementById("zatvori_" + id)
        div.style.display = 'none'

    }
    otvori(id) {
        this.nizOtvorenih.push(id)
        localStorage.setItem("nizOtvorenih", JSON.stringify(this.nizOtvorenih))
        let div = document.getElementById("zatvori_" + id)
        div.style.display = 'block'
    }

    logout() {
        localStorage.setItem("token", null);
    }

}



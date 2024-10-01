"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
@(0, core_1.Component)({
    selector: 'app-root',
    standalone: true,
    imports: [router_1.RouterOutlet, common_1.CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
class AppComponent {
    allTasks;
    title = 'taskmanager-frontend';
    constructor() { }
    ngOnInit() {
        fetch('http://localhost:3000/api/v1/tasks/2')
            .then((res) => res.json())
            .then((data) => {
            this.allTasks = data?.tasks;
        })
            .catch((error) => {
            console.log('Error fetching tasks:', error);
        });
    }
}
exports.AppComponent = AppComponent;

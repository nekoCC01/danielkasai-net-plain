import './styles/every-layout/all.js';
import { registerHeaderComponent } from './js/components/header.js';
import { registerFooterComponent } from './js/components/footer.js';

const app = () => {
    registerHeaderComponent();
    registerFooterComponent();
}
document.addEventListener('DOMContentLoaded', app);

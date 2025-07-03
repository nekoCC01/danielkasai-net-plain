import './styles/every-layout/all.js';
import { registerHeaderComponent } from './js/components/header.js';

const app = () => {
    registerHeaderComponent();
}

document.addEventListener('DOMContentLoaded', app);
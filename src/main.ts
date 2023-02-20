import Avatar from './components/avatar';
import Button from './components/button';
import Component from './components/component';
import Container from './components/container';
import Drawer from './components/drawer';
import Header from './components/header';
import Modal from './components/modal';
import Preview from './components/preview';
import './style.scss';

new Preview().appendTo(document.querySelector('#app')!);

export { Avatar, Button, Component, Container, Drawer, Header, Modal };

# Pure Components

Dependency-free ui components library.

### **Work in progress!**

![Dependency-free](https://img.shields.io/badge/Dependency-%20free-green)
![Version 0.0.32](https://img.shields.io/badge/Version-%200.0.32-green)
![Test coverage: 70.47%](https://img.shields.io/badge/Test%20Coverage-70.47%25-green)
![Components: 8](https://img.shields.io/badge/Components-%208-green)

## Install

To use Pure Components in your project, run one of the following commands in your terminal:

```
yarn add @nathanssantos/pure-components
```

```
npm install @nathanssantos/pure-components
```

## Basic Example

### [Take a look at the demo](https://nathanssantos.github.io/pure-components/)

```typescript
import { Component, Button } from '@nathanssantos/pure-components';
import '@nathanssantos/pure-components/style.css';

const button = new Button({
  innerHTML: "I'm a button.",
  style: {
    marginTop: '2rem',
  },
  events: {
    click: (instance, event) => {
      event.stopPropagation();
      instance.setStyle({ backgroundColor: 'rebeccapurple', color: 'white' });
    },
  },
});

const component = new Component({
  innerHTML: "I'm a generic component.",
  style: {
    backgroundColor: 'lightskyblue',
    padding: '2rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
  events: {
    click: (instance) => {
      instance.setStyle({ backgroundColor: 'rebeccapurple', color: 'white' });
    },
    mouseleave: ({ setStyle, children }) => {
      setStyle({ backgroundColor: 'lightskyblue', color: 'black' });
      children.button.setStyle({
        backgroundColor: 'tomato',
        color: 'black',
      });
    },
  },
  children: {
    button,
  },
});

new Tabs({
  tabList: {
    children: {
      tab1: new Tab({
        innerHTML: 'Tab 1',
      }),
      tab2: new Tab({
        innerHTML: 'Tab 2',
      }),
      tab3: new Tab({
        innerHTML: 'Tab 3',
      }),
    },
  },
  tabPanels: {
    children: {
      panel1: new TabPanel({
        children: component,
      }),
      panel2: new TabPanel({
        innerHTML: 'TabPanel 2',
      }),
      panel3: new TabPanel({
        innerHTML: 'TabPanel 3',
      }),
    },
  },
}).appendTo(document.body);
```

## Components

- [x] Component
- [x] Drawer
- [x] Modal
- [x] Avatar
- [x] Button
- [x] Container
- [x] Header
- [x] Tabs
- [ ] Tag
- [ ] Breadcrumbs
- [ ] Floating Action Button
- [ ] Progress
- [ ] Checkbox
- [ ] Radio
- [ ] Org Chart
- [ ] Autocomplete
- [ ] Toast
- [ ] Tooltip
- [ ] Popover
- [ ] Carousel

**The complete documentation will be written as soon as possible.**

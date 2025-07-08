# BtgFondosApp

Aplicación web desarrollada en Angular como parte de una prueba técnica para la vacante de **Ingeniero de Desarrollo Front-End** en BTG. Esta aplicación permite a los usuarios visualizar fondos de inversión (FPV/FIC), simular suscripciones, cancelar inversiones y consultar su historial.

## Instalación y ejecución
### Requisitos
- Node.js v18+
- Angular CLI v20+
- Git

### Pasos para ejecutar localmente
```bash
git clone https://github.com/jc9218/btg-fondos-app.git
cd btg-fondos-app
npm install
npm start
```
Luego abre tu navegador en http://localhost:4200

### Funcionalidades
Visualización de fondos de inversión disponibles

Inversión desde un monto mínimo configurable

Validación de saldo antes de invertir

Cancelación de inversiones

Historial de transacciones con monto, fecha y tipo

Arquitectura modular con componentes standalone

### Estructura del proyecto
```bash
src/
├── app/
│   ├── core/              # Modelos y servicios
│   ├── features/          # Páginas principales (Fondos, Historial)
│   ├── shared/            # Componentes reutilizables
├── environments/          # Configuraciones de entorno
```

### Testing
```bash
ng test
```

## Build para producción
```bash
ng build --configuration production
🛠 Comandos útiles
Comando	Descripción
npm start	Ejecuta la aplicación en modo desarrollo
ng build	Compila el proyecto para producción
ng test	Ejecuta pruebas unitarias (Karma)
ng generate	Genera componentes, servicios, etc.
```

## Recursos
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io)
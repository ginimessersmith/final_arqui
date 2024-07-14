# Examen Final de Arquitectura de Software

Bienvenido al repositorio del examen final de Arquitectura de Software. En este proyecto, se implementa el enunciado descrito en la imagen adjunta, utilizando el patrón de arquitectura en 3 capas junto con dos patrones de diseño: State y Strategy.

## Descripción del Proyecto

Este proyecto aborda los siguientes componentes clave:

1. **Patrón de Arquitectura en 3 Capas**:
   - **Capa de Presentación**: Encargada de la interfaz de usuario.
   - **Capa de Negocios**: Responsable de la lógica de negocio.
   - **Capa de Datos**: Maneja la persistencia de los datos.

2. **Patrones de Diseño**:
   - **State**: Permite a un objeto cambiar su comportamiento cuando su estado interno cambia. Este patrón es particularmente útil para representar estados y transiciones en una máquina de estados.
   - **Strategy**: Define una familia de algoritmos, los encapsula y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilicen.

Se usa el patron State para el cambio de estado de los productos (Registrado, Revisado y Guardado).
El patron Strategy es usado para elegir la estrategia a calcular el precio de venta en tiempo de ejecucion.

## Corrección de Errores

### Problema con el Patrón State

Se ha identificado un error en la implementación del patrón State. En la implementación actual, las clases heredadas cuentan con una función para avanzar de estado (ya implementada), pero falta una función crucial que impida retroceder al estado anterior.

### Solución Propuesta

Para corregir este error, se recomienda las siguientes modificaciones:

- **Implementación de la Función `impedirRetroceso`**: Se ha añadido una nueva función en las clases heredadas del patrón State para evitar que el estado retroceda.
- **Refactorización del Código**: Asegurar que todas las clases que implementan el patrón State incluyan ambas funciones: `avanzarEstado` y `impedirRetroceso`.

## Uso del Proyecto

Para clonar y ejecutar este proyecto, sigue los siguientes pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/examen-final-arquitectura-software.git

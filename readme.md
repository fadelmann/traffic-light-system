# Traffic Light Simulation

This project simulates a traffic light system with main street, side street, and pedestrian traffic lights. The traffic light phases are managed using React context and hooks.

## Features

- Main street traffic light
- Side street traffic light
- Pedestrian traffic light
- Manual control buttons for traffic light phases

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/traffic-light-simulation.git
   cd traffic-light-simulation
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the application:
   ```sh
   npm start
   ```

## Usage

The application will start a local server, and you can view the traffic light simulation in your browser at `http://localhost:3000`.

## Components

### MainStreetTrafficLight

Displays the traffic light for the main street.

### SideStreetTrafficLight

Displays the traffic light for the side street, synchronized with the main street light.

### PedestrianTrafficLight

Displays the traffic light for pedestrians, synchronized with the main street light.

### TrafficLightButtons

Provides buttons to manually change the traffic light phases.

## Custom Hook

### useTrafficLightPhases

A custom hook that cycles through traffic light phases (`red`, `green`, `yellow`) every second.

## Context

### TrafficLightContext

Provides the current traffic light phase to all components.

## Rationale

The solution uses React context and hooks to manage state and synchronize traffic light phases. This approach was chosen for its simplicity and direct integration with React's component lifecycle. Using a state machine or third-party library for state management was deemed unnecessary for this project due to its straightforward requirements. React's built-in hooks and context provide sufficient functionality to achieve the desired behavior with minimal complexity.

## Improvements

1. **Error Handling:** Add error handling to manage potential issues during phase transitions.
2. **Configuration:** Allow configurable phase durations through props or context.
3. **Unit Tests:** Implement unit tests for components and hooks to ensure correctness.
4. **Accessibility:** Improve accessibility by adding ARIA roles and properties.
5. **Styling:** Enhance styling with CSS modules or styled-components for better maintainability.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

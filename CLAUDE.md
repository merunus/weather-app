# Typescript
- Do not use “any” type
# File structure
- For each component create a separate folder
- Each component folder should have a types.ts file where should be only types that are used inside this component
# Components 
- Decompose components
- Prevent having more than 200 lines of code inside a single component, split it into multiple components
- Components that are only used inside another component should be located inside parent component directory
# Run/Check Discipline
- After every code changes run typescript check and lint

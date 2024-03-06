---
name: "viwe"
root: "src/components/views"
output: "."
ignore: []
questions:
  name: "Please enter a component name."
  hasHooks:
    confirm: "Is it have hooks? (Default false)"
    initial: false
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from "./{{ inputs.name | pascal }}";
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import {use{{ inputs.name | pascal }}} from "./use{{ inputs.name | pascal }}"

type {{ inputs.name | pascal }}Props = {

}

export const {{ inputs.name | pascal }} = (props: {{ inputs.name | pascal }}Props) => {
  {{ if inputs.hasHooks }}const {} = use{{ inputs.name | pascal }}(){{ end }}
  return <></>
}

```

# `{{ !inputs.hasHooks && '!' }}{{ inputs.name | pascal }}/use{{ inputs.name | pascal }}.ts`

```typescript
export const use{{inputs.name | pascal}} = () => {
  return {}
}
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import { action } from '@storybook/addon-actions'
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "views/{{ inputs.name | pascal }}",
  component: {{ inputs.name | pascal }},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof  {{ inputs.name | pascal }}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
  },
  parameters: {
    docs: {
      description: {
        component: `コンポーネントの説明マークダウン。`,
      },
    },
  },
};


```

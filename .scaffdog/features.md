---
name: "features"
root: "src/components/features"
output: "."
ignore: []
questions:
  name: "Please enter a component name."
  hasProps:
    confirm: "Is it have props? (Default false)"
    initial: false
  hasStory:
    confirm: "Is it have story? (Default false)"
    initial: false
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from "./{{ inputs.name | pascal }}";
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import { use{{ inputs.name | pascal }} } from "./use{{ inputs.name | pascal }}"

{{ if inputs.hasProps }}
type {{ inputs.name | pascal }}Props = {

}
{{ end }}

export const {{ inputs.name | pascal }} = ({{ if inputs.hasProps }}props: {{ inputs.name | pascal }}Props{{ end }}) => {
  const {} = use{{ inputs.name | pascal }}()
  return <></>
}
```

# `{{ inputs.name | pascal }}/use{{ inputs.name | pascal }}.ts`

```typescript
export const use{{inputs.name | pascal}} = () => {
  return {}
}
```

# `{{ !inputs.hasStory && '!' }}{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import { action } from '@storybook/addon-actions'
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'


const meta = {
  title: "features/{{ inputs.name | pascal }}",
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

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.test.ts`

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}'

describe('{{ inputs.name | pascal }}のテスト', () => {

  it('テストケースと期待される結果を記述', () => {
    render(<ToDoList />)
    expect(screen.getByText('ToDo List')).toBeTruthy()
  })

})

```

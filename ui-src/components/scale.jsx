import React from 'react'
import {
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  FontStyleIcon,
} from '@radix-ui/react-icons'
import { Box } from './box'
import { Text } from './text'
import { useStore } from '../store'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'
import { BarGraph } from './barGraph'

const Key = ({
  icon = <CheckIcon />,
  label = 'Preferred',
  color = '$green300',
}) => (
  <Box
    direction="horizontal"
    columns="auto-free"
    alignItems="center"
    justifySelf="center"
    gap="tight"
  >
    <Box
      alignItems="center"
      justifyItems="center"
      css={{
        backgroundColor: color,
        border: '1px solid $gray900',
        height: '$3',
        width: '$3',
      }}
    >
      {React.cloneElement(icon)}
    </Box>
    <Text size="1" weight="medium">
      {label}
    </Text>
  </Box>
)

const weights = [
  {
    weight: 200,
    fontClass: 'x-light',
    tooltip: 'Font Weight 200: Extra Light',
  },
  {
    weight: 300,
    fontClass: 'light',
    tooltip: 'Font Weight 300: Light',
  },
  {
    weight: 400,
    fontClass: '',
    tooltip: 'Font Weight 400: Regular',
  },
  {
    weight: 500,
    fontClass: 'medium',
    tooltip: 'Font Weight 500: Medium',
  },
  {
    weight: 600,
    fontClass: 'semi-bold',
    tooltip: 'Font Weight 600: Semi Bold',
  },
  {
    weight: 700,
    fontClass: 'bold',
    tooltip: 'Font Weight 700: Bold',
  },
]

function Scale() {
  const contrast = useStore(state => state.contrast)
  return (
    <Box
      css={{ pt: '$4', px: '$4', pb: '$2', userSelect: 'none', height: '100%' }}
    >
      <Box gap="tight" alignContent="start">
        <Box css={{ paddingLeft: '$1' }} columns="auto-free" gap="loose">
          <FontStyleIcon />
          <Box direction="horizontal" columns="auto-free">
            <Text size="1" light weight="bold">
              14px
            </Text>
            <Text size="1" light css={{ justifySelf: 'end' }} weight="bold">
              96px
            </Text>
          </Box>
        </Box>
        {weights.map(({ weight, fontClass, tooltip }, i) => (
          <Box alignItems="center" key={i} columns="auto-free" gap="loose">
            <Tooltip>
              <TooltipTrigger asChild>
                <Text weight={fontClass}>{weight}</Text>
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
            <BarGraph weight={weight} contrast={contrast} />
          </Box>
        ))}
      </Box>
      <Box
        alignSelf="end"
        direction="horizontal"
        css={{ gridTemplateColumns: 'auto 1fr auto' }}
      >
        <Key />
        <Key
          color="$yellow300"
          label="Minimum"
          icon={<ExclamationTriangleIcon />}
        />
        <Key color="$red400" label="Not suitable" icon={<Cross2Icon />} />
      </Box>
    </Box>
  )
}

export default Scale

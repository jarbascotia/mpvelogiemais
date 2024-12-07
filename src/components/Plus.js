import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copiar', action: () => document.execCommand('copy') },
  { icon: <SaveIcon />, name: 'Salvar', action: () => savePage() },
  { icon: <PrintIcon />, name: 'Imprimir', action: () => window.print() },
  { icon: <ShareIcon />, name: 'Compartilhar', action: () => sharePage() },
];

// Função para salvar a página
const savePage = () => {
  const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pagina.html';
  a.click();
};

// Função para compartilhar a página
const sharePage = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Confira esta página!',
      url: window.location.href,
    }).catch((error) => console.error('Erro ao compartilhar:', error));
  } else {
    alert('Compartilhamento não suportado neste navegador.');
  }
};

export default function PlaygroundSpeedDial() {
  const [direction] = React.useState('down');

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Box sx={{ position: 'relative', mt: 3, height: 10 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}

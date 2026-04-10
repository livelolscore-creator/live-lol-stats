import { ThemeType } from './ThemeContext'
import { Theme } from './Theme'

export const THEMES: Record<ThemeType, Theme> = {
    dark: {
        '--theme-switch-notch': '#C8A84B',
        '--theme-switch-bg':    '#0F1525',
        '--logo-color':         '#C8A84B',
        '--card-color':         '#0F1525',
        '--background':         '#0A0E1A',
        '--gray-line':          '#1E2A42',
        '--text':               '#E8EAF0',
        '--text-highlight':     '#C8A84B',
        '--title':              '#FFFFFF',
        '--red':                '#C0392B',
        '--green':              '#27AE60',
        '--purple':             '#6B48C8',
        '--green-positive':     '#2ECC71',
        '--blue':               '#2A6DD9',
        '--blue-dark':          '#1A4D99',
        '--blue-twitter':       '#2A6DD9',
        'background':           'var(--background)',
    },
    light: {
        '--theme-switch-notch': '#C8A84B',
        '--theme-switch-bg':    '#E8EAF0',
        '--logo-color':         '#0A0E1A',
        '--card-color':         '#FFFFFF',
        '--background':         '#F0F2F5',
        '--gray-line':          '#DDE1EA',
        '--text':               '#3A4460',
        '--text-highlight':     '#C8A84B',
        '--title':              '#0A0E1A',
        '--red':                '#C0392B',
        '--green':              '#27AE60',
        '--purple':             '#6B48C8',
        '--green-positive':     '#27AE60',
        '--blue':               '#2A6DD9',
        '--blue-dark':          '#1A4D99',
        '--blue-twitter':       '#2A6DD9',
        'background':           'var(--background)',
    }
}

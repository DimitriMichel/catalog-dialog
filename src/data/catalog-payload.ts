import { CatalogPayload } from '../types/types.ts';
import CameraIcon from '@assets/icons/camera.svg';
import GaugeIcon from '@assets/icons/gauge.svg';
import SealCheckIcon from '@assets/icons/seal-check.svg';
import TagIcon from '@assets/icons/tag.svg';
import DatabaseIcon from '@assets/icons/database.svg';
import ToolsIcon from '@assets/icons/toolbox.svg';
import HammerIcon from '@assets/icons/hammer.svg';
export const catalogPayload: CatalogPayload = {
  categories: [
    {
      id: 'cat-data-entry',
      name: 'Data Entry',
      icon: DatabaseIcon,
    },
    {
      id: 'cat-photos',
      name: 'Photos',
      icon: CameraIcon,
    },
    {
      id: 'cat-pressure-tests',
      name: 'Pressure Tests',
      icon: GaugeIcon,
    },
    {
      id: 'cat-status',
      name: 'Status',
      icon: SealCheckIcon,
    },
    {
      id: 'cat-tags',
      name: 'Tags',
      icon: TagIcon,
    },
    {
      id: 'cat-tensioning',
      name: 'Tensioning',
    },
    {
      id: 'cat-tools',
      name: 'Tools',
      icon: ToolsIcon,
    },
    {
      id: 'cat-torquing',
      name: 'Torquing',
      icon: HammerIcon,
    },
    {
      id: 'cat-duct-tape-solutions',
      name: 'Duct Tape',
    },
  ],
  items: [
    {
      id: 'item-take-photo',
      name: 'Take Photo',
      description: 'Take a photo to upload',
      icon: null,
      tags: ['tag-photos'],
      category: 'cat-photos',
    },
    {
      id: 'item-review-photo',
      name: 'Review Photo',
      description: 'Review previously taken photos',
      icon: null,
      tags: ['tag-photos', 'tag-review'],
      category: 'cat-photos',
    },
    {
      id: 'item-record-tag',
      name: 'Record Tag',
      description: 'Scan and record a QR tag',
      icon: null,
      tags: ['tag-photos', 'tag-qr-code'],
      category: 'cat-tags',
    },
    {
      id: 'item-data-entry',
      name: 'Data Entry',
      description: 'Scan a QR code or manually enter value',
      icon: null,
      tags: ['tag-forms'],
      category: 'cat-data-entry',
    },
    {
      id: 'item-checklist',
      name: 'Checklist',
      description: 'Fill out a checklist form',
      icon: null,
      tags: ['tag-checklist'],
      category: 'cat-data-entry',
    },
    {
      id: 'item-smart-tighten',
      name: 'Smart Tighten',
      description: 'Capture tightening activity per pass',
      icon: null,
      tags: ['tag-torque', 'tag-craft'],
      category: 'cat-torquing',
    },
    {
      id: 'item-tool-selection',
      name: 'Tool Selection',
      description: 'Build a toolkit before starting work',
      icon: null,
      tags: ['tag-toolkit', 'tag-craft'],
      category: 'cat-tools',
    },
    {
      id: 'item-confirmation',
      name: 'Confirmation',
      description: 'Display success / error message',
      icon: null,
      tags: ['tag-messages'],
      category: 'cat-status',
    },
    {
      id: 'item-capture-tag',
      name: 'Capture Tag',
      description: 'Scan and record value from a QR code',
      icon: null,
      tags: ['tag-forms'],
      category: 'cat-data-entry',
    },
    {
      id: 'item-pressure-test',
      name: 'Pressure Test',
      description: 'Enable hold and ramp procedures',
      icon: null,
      tags: ['tag-craft'],
      category: 'cat-pressure-tests',
    },
    {
      id: 'item-tension',
      name: 'Tension',
      description: 'Enable hydraulic tensioning',
      icon: null,
      tags: ['tag-craft'],
      category: 'cat-tensioning',
    },
  ],
  tags: [
    {
      id: 'tag-photos',
      primary: 'photos',
      aliases: ['pictures', 'images'],
    },
    {
      id: 'tag-review',
      primary: 'review',
      aliases: ['qc', 'check', 'quality control'],
    },
    {
      id: 'tag-qr-code',
      primary: 'qr-code',
      aliases: ['code', 'scan', 'tag', 'barcode'],
    },
    {
      id: 'tag-forms',
      primary: 'forms',
      aliases: ['data entry'],
    },
    {
      id: 'tag-checklist',
      primary: 'checklist',
      aliases: ['punch list', 'check list'],
    },
    {
      id: 'tag-torque',
      primary: 'torque',
      aliases: ['tighten', 'bolts'],
    },
    {
      id: 'tag-craft',
      primary: 'craft',
      aliases: ['workers'],
    },
    {
      id: 'tag-toolkit',
      primary: 'toolkit',
      aliases: ['tools', 'assemble'],
    },
    {
      id: 'tag-messages',
      primary: 'messages',
      aliases: ['success', 'failure', 'rejected', 'qc failed'],
    },
  ],
};

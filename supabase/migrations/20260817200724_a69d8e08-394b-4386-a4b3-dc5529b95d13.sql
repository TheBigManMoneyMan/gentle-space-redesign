UPDATE site_sections SET sort_order = 3 WHERE section_key = 'approach';
UPDATE site_sections SET sort_order = 4 WHERE section_key = 'promo';
UPDATE site_sections SET sort_order = 5 WHERE section_key = 'principles';

UPDATE site_content SET section_key = 'principles' WHERE section_key = 'approach' AND content_key IN ('closing_1', 'closing_2');
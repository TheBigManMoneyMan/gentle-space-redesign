UPDATE site_content
SET section_key = 'principles'
WHERE section_key = 'approach'
  AND content_key IN ('key_message', 'benefits_header', 'benefit_1', 'benefit_2', 'benefit_3', 'benefit_4');
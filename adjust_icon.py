from PIL import Image
import os

# Caminhos
input_path = r"C:/Users/joaob/.gemini/antigravity/brain/5061b097-3c8d-48e3-a161-ea73294f0b1d/uploaded_media_1769709871069.png"
output_path = r"c:\Users\joaob\OneDrive\Área de Trabalho\Workspace Projetos\CADService\frontend\public\icon.png"

try:
    print(f"Opening image from: {input_path}")
    img = Image.open(input_path)
    width, height = img.size
    print(f"Original size: {width}x{height}")

    # Crop: remover 12% de cada lado para dar um "zoom" significativo no texto CAD
    # sem perder completamente o estilo do botão (apenas bordas azuis vazias)
    margin_x = int(width * 0.12)
    margin_y = int(height * 0.12)
    
    box = (margin_x, margin_y, width - margin_x, height - margin_y)
    print(f"Cropping box: {box}")
    
    cropped_img = img.crop(box)
    
    # Redimensionar para manter alta qualidade (512x512)
    final_img = cropped_img.resize((512, 512), Image.Resampling.LANCZOS)
    
    final_img.save(output_path)
    print(f"Icon saved successfully to: {output_path}")

except Exception as e:
    print(f"Error processing image: {e}")

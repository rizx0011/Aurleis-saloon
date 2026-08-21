import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for mouse parallax tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Geometry: Organic Torus Knot (Sculptural Ribbon / Ring of Craft)
    const ribbonGeo = new THREE.TorusKnotGeometry(1.3, 0.38, 128, 32, 2, 3);
    
    // Luxury Frosted Rose Gold & Champagne Material
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#EED9D5'),
      emissive: new THREE.Color('#D9A9A0'),
      emissiveIntensity: 0.12,
      roughness: 0.2,
      metalness: 0.15,
      transmission: 0.7, // Frosted glass look
      thickness: 1.2,
      ior: 1.45,
      transparent: true,
      opacity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    mainGroup.add(ribbonMesh);

    // Inner Floating Champagne Core (Sphere)
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F2E5D0'),
      emissive: new THREE.Color('#C9A66B'),
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Floating Glass Micro-Orbs (Satellites)
    const particlesCount = 24;
    const particleGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const particleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D9A9A0'),
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75,
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particlesCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      const theta = (i / particlesCount) * Math.PI * 2;
      const radius = 2.2 + (Math.random() * 0.8 - 0.4);
      p.position.set(
        Math.cos(theta) * radius,
        (Math.random() - 0.5) * 2.0,
        Math.sin(theta) * radius
      );
      mainGroup.add(p);
      particles.push(p);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const roseFillLight = new THREE.PointLight(0xd9a9a0, 4.0, 10);
    roseFillLight.position.set(-4, -2, 3);
    scene.add(roseFillLight);

    const goldRimLight = new THREE.PointLight(0xc9a66b, 3.0, 10);
    goldRimLight.position.set(0, 4, -3);
    scene.add(goldRimLight);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = y * 1.2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.25 + mouseX * 0.8;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + mouseY * 0.8;
      mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;

      ribbonMesh.rotation.z = elapsedTime * 0.1;
      coreMesh.rotation.y = -elapsedTime * 0.4;

      // Animate floating satellites
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.003;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-3d-viewport"
      aria-label="Interactive 3D Glass Sculpture"
      role="img"
    />
  );
};
